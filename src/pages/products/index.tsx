import { Box, Divider, Grid, IconButton, Tooltip } from "@mui/joy";
import {
  AlertDialogModal,
  DataTable,
  DataTableHead,
  SearchBar,
} from "../../components";
import { useEffect, useState } from "react";
import { IPaginate, IPagination } from "../../interfaces/pagination";
import {
  Cancel,
  CheckCircle,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { getProducts, removeProduct, saveProduct } from "../../api/products";
import { IProduct, IProductFilter } from "../../interfaces/product";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../components/SnackbarUtils";
import useColumns from "./columns";
import Filters from "./filters";
import { ProductFilterInitialValues } from "../../common/form-values";

export const ProductsPage = () => {
  const navigate = useNavigate();
  const columns = useColumns();
  const [filters, setFilters] = useState<IProductFilter>(
    ProductFilterInitialValues
  );
  const [search, setSearch] = useState<string>("");
  const [rows, setRows] = useState<IProduct[]>([]);
  const [row, setRow] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
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
  });

  const lastColumn: any = {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: "var(--Table-lastColumnWidth)",
    render: (_: any, record: IProduct) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip
          title={
            record.status == "available"
              ? "Mark as Not available"
              : "Mark as Available"
          }
          variant="outlined"
          color={record.status == "available" ? "danger" : "success"}
          arrow
        >
          <IconButton
            size="sm"
            color={record.status == "available" ? "danger" : "success"}
            onClick={() => {
              let payload: IProduct = record;
              payload.status =
                record.status == "available" ? "notavailable" : "available";
              onStatusUpdate(payload);
            }}
          >
            {record.status == "available" ? <Cancel /> : <CheckCircle />}
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" />

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

        <Tooltip title="Remove item" variant="outlined" color="danger" arrow>
          <IconButton
            size="sm"
            color="danger"
            onClick={() => {
              setRow(record);
              setShowAlert(true);
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(
        search,
        paginate.page,
        paginate.limit,
        sort,
        filters
      );
      setRows(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await removeProduct(row?.id || 0);
      setRow(undefined);
      await fetchProducts();
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

  const onStatusUpdate = async (item: IProduct) => {
    setLoading(true);
    try {
      await saveProduct(item);
      await fetchProducts();
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
  };

  useEffect(() => {
    fetchProducts();
  }, [paginate, search, sort, filters]);

  return (
    <Box>
      <DataTableHead
        title="Products"
        btnText="Add New"
        onClick={() => {
          navigate("manage");
        }}
      />

      <Grid
        container
        spacing={2}
        py={2}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"flex-end"}
      >
        <Grid xs={12} md={11}>
          <SearchBar
            placeholder="Search by name or url"
            value={search}
            onChange={(text: string) => setSearch(text)}
          />
        </Grid>
        <Grid xs={12} md={1}>
          <Filters
            onApplyFilters={(filters: IProductFilter) => {
              setFilters(filters);
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
        confirmButtonProps={{
          loading: loading,
          onClick: () => onDelete(),
        }}
        cancelButtonProps={{
          onClick: () => setShowAlert(false),
        }}
      />
    </Box>
  );
};
export default ProductsPage;
