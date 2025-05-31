import { Box, ButtonProps, Divider, Grid, IconButton, Tooltip } from "@mui/joy";
import {
  AlertDialogModal,
  DataTable,
  DataTableHead,
  Form,
  SearchBar,
} from "../../components";
import Filters from "./filters";
import { useEffect, useRef, useState } from "react";
import { getBookings, removeBooking, saveBooking } from "../../api/bookings";
import { IBooking } from "../../interfaces/booking";
import { IPaginate, IPagination } from "../../interfaces/pagination";
import useColumns from "./columns";
import {
  CancelRounded,
  CheckCircleRounded,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  LocalShippingRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../components/SnackbarUtils";
import {
  BookingAlertMeta,
  BookingAlertMetaInfo,
} from "../../common/booking-utils";
import { FormikProps } from "formik";
import { BookingActionInitialValues } from "../../common/form-values";
import { getDynamicBookingActionValidationSchema } from "../../common/form-schema";
import { BookingActionInputFields } from "../../common/form-fields";
import { useUserRole } from "../../common/auth-utils";
import {
  canApprove,
  canCancel,
  canDeliver,
  canEdit,
  canDelete,
  canAdd,
} from "../../utils/booking-utils";

export const BookingsPage = () => {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const columns = useColumns();
  const formikRef = useRef<FormikProps<any>>(null);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [rows, setRows] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMeta, setAlertMeta] = useState<BookingAlertMetaInfo>();
  const [alertConfirm, setAlertConfirm] = useState<ButtonProps>();
  const [sort, setSort] = useState<string>(import.meta.env.VITE_DEFAULT_SORT);
  const [paginate, setPaginate] = useState<IPaginate>({
    page: Number(import.meta.env.VITE_PAGINATION_PAGE),
    limit: Number(import.meta.env.VITE_PAGINATION_LIMIT),
  });
  const [pagination, setPagination] = useState<IPagination>({
    total_items: 0,
    total_pages: 0,
    current_page: 0,
    page_size: 0,
    onPageChange: (page: number) => console.log(page),
  });

  const lastColumn: any = {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: "var(--Table-lastColumnWidth)",
    render: (_: any, record: IBooking) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* Approve */}
        {userRole &&
          canApprove(userRole as any) &&
          record.status != "approved" &&
          record.status != "delivered" && (
            <Tooltip title="Approve" variant="outlined" color="success" arrow>
              <IconButton
                size="sm"
                color="success"
                onClick={() => {
                  setAlertMeta(
                    BookingAlertMeta.find((item) => item.status == "approved")
                  );
                  setAlertConfirm({
                    color: "success",
                    onClick: () =>
                      onUpdate({
                        ...record,
                        status: "approved",
                        approved_time: new Date().toISOString(),
                      }),
                  });
                  setShowAlert(true);
                }}
              >
                <CheckCircleRounded />
              </IconButton>
            </Tooltip>
          )}

        {/* Cancel */}
        {userRole &&
          canCancel(userRole as any) &&
          record.status != "cancelled" &&
          record.status != "delivered" && (
            <Tooltip title="Cancel" variant="outlined" color="danger" arrow>
              <IconButton
                size="sm"
                color="danger"
                onClick={() => {
                  setAlertMeta(
                    BookingAlertMeta.find((item) => item.status == "cancelled")
                  );
                  setAlertConfirm({
                    color: "danger",
                    onClick: () =>
                      onUpdate({
                        ...record,
                        status: "cancelled",
                        cancel_time: new Date().toISOString(),
                      }),
                  });
                  setShowAlert(true);
                }}
              >
                <CancelRounded />
              </IconButton>
            </Tooltip>
          )}

        {/* Deliver */}
        {userRole &&
          canDeliver(userRole as any) &&
          record.status != "delivered" && (
            <Tooltip title="Deliver" variant="outlined" color="primary" arrow>
              <IconButton
                size="sm"
                color="primary"
                onClick={() => {
                  setAlertMeta(
                    BookingAlertMeta.find((item) => item.status == "delivered")
                  );
                  setAlertConfirm({
                    color: "primary",
                    onClick: () =>
                      onUpdate({
                        ...record,
                        status: "delivered",
                        deliver_time: new Date().toISOString(),
                      }),
                  });
                  setShowAlert(true);
                }}
              >
                <LocalShippingRounded />
              </IconButton>
            </Tooltip>
          )}

        {userRole &&
          (canEdit(userRole as any) || canDelete(userRole as any)) && (
            <Divider orientation="vertical" />
          )}

        {/* Edit */}
        {userRole && canEdit(userRole as any) && (
          <Tooltip title="Edit item" variant="outlined" color="primary" arrow>
            <IconButton
              size="sm"
              color="primary"
              onClick={() => {
                navigate("manage", { state: record });
              }}
            >
              <EditOutlined />
            </IconButton>
          </Tooltip>
        )}

        {/* Remove */}
        {userRole && canDelete(userRole as any) && (
          <Tooltip title="Remove item" variant="outlined" color="danger" arrow>
            <IconButton
              size="sm"
              color="danger"
              onClick={() => {
                setAlertConfirm({
                  onClick: () => onDelete(record),
                });
                setShowAlert(true);
              }}
            >
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
  };

  const fetchBookings = async () => {
    setLoading(true);

    try {
      const response = await getBookings(
        search,
        paginate.page,
        paginate.limit,
        sort,
        { status: filter }
      );
      setRows(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const onDelete = async (booking: IBooking) => {
    setLoading(true);

    try {
      await removeBooking(booking?.id || 0);
      await fetchBookings();
      showSnackbar({
        message: "Data removed successfully.",
        color: "success",
        size: "lg",
        open: true,
        startDecorator: <CheckOutlined />,
      });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    setShowAlert(false);
  };

  const onUpdate = async (booking: IBooking) => {
    if (formikRef.current && booking.status !== "approved")
      await formikRef.current.submitForm();
    if (!formikRef.current?.isValid && booking.status !== "approved") return;
    setLoading(true);

    try {
      const payload: IBooking = { ...booking, ...formikRef?.current?.values };
      await saveBooking(payload);
      await fetchBookings();
      showSnackbar({
        message: "Data updated successfully.",
        color: "success",
        size: "lg",
        open: true,
        startDecorator: <CheckOutlined />,
      });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    setShowAlert(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [paginate, search, sort, filter]);

  return (
    <Box>
      <DataTableHead
        title="Bookings"
        btnText="Add New"
        disabled={!userRole || !canAdd(userRole as any)}
        onClick={() => {
          navigate("manage");
        }}
      />
      <Grid container spacing={2} py={2} display={"flex"} flexWrap={"wrap"}>
        <Grid xs={12} md={10}>
          <SearchBar
            placeholder="Search by booking id, email, wallet"
            value={search}
            onChange={(text: string) => setSearch(text)}
          />
        </Grid>
        <Grid xs={12} md={2}>
          <Filters
            onChange={(text: string | null) => {
              setFilter(!text ? "" : text);
            }}
          />
        </Grid>
      </Grid>
      <DataTable
        columns={[...columns, lastColumn]}
        dataSource={rows}
        loading={loading}
        showSorterTooltip={false}
        paginate={{
          page_size: pagination.page_size,
          current_page: pagination.current_page,
          total_items: pagination.total_items,
          total_pages: pagination.total_pages,
          onPageChange: (page: number, limit: number) => {
            setPaginate({ page, limit });
          },
        }}
        onChange={(_, __, sorter: any) => {
          setSort(
            sorter.order == undefined
              ? import.meta.env.VITE_DEFAULT_SORT
              : sorter.columnKey + "," + sorter.order
          );
        }}
      />

      <AlertDialogModal
        visible={showAlert}
        title={alertMeta?.title}
        description={alertMeta?.description}
        confirmButtonProps={{ ...alertConfirm, loading: loading }}
        cancelButtonProps={{
          onClick: () => {
            setShowAlert(false);
            setAlertMeta(undefined);
          },
        }}
        content={
          alertMeta?.status &&
          alertMeta?.status != "approved" && (
            <Box py={2}>
              <Form
                formikRef={formikRef}
                initialValues={BookingActionInitialValues}
                validationSchema={getDynamicBookingActionValidationSchema(
                  alertMeta?.status || "pending"
                )}
                inputFields={
                  alertMeta?.status === "cancelled"
                    ? BookingActionInputFields.slice(2)
                    : alertMeta?.status === "delivered"
                    ? BookingActionInputFields.slice(0, 2)
                    : BookingActionInputFields
                }
                onSubmit={(_) => _}
                fullWidth
              />
            </Box>
          )
        }
      />
    </Box>
  );
};
export default BookingsPage;
