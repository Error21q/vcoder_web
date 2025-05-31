import { Box, IconButton, Tooltip } from "@mui/joy";
import {
  AlertDialogModal,
  DataTable,
  DataTableHead,
  SearchBar,
} from "../../components";
import { useEffect, useState } from "react";
import { IPaginate, IPagination } from "../../interfaces/pagination";
import { Columns } from "./columns";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { getBlockchains, removeBlockchain } from "../../api/blockchains";
import { useNavigate } from "react-router-dom";
import { IBlockchain } from "../../interfaces/blockchain";
import { showSnackbar } from "../../components/SnackbarUtils";
import { useUserRole } from "../../common/auth-utils";
import {
  UserRole,
  canEdit,
  canDelete,
  canAdd,
} from "../../utils/blockchain-utils";

export const BlockchainsPage = () => {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const [search, setSearch] = useState<string>("");
  const [rows, setRows] = useState<IBlockchain[]>([]);
  const [row, setRow] = useState<IBlockchain>();
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
    onPageChange: (page: number) => console.log(page),
  });

  const lastColumn: any = {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: "var(--Table-lastColumnWidth)",
    render: (_: any, record: IBlockchain) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        {userRole && canEdit(userRole as unknown as UserRole) && (
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

        {userRole && canDelete(userRole as unknown as UserRole) && (
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
        )}
      </Box>
    ),
  };

  const fetchBlockchains = async () => {
    setLoading(true);
    try {
      const response = await getBlockchains(
        search,
        paginate.page,
        paginate.limit,
        sort
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
      await removeBlockchain(row?.id || 0);
      setRow(undefined);
      await fetchBlockchains();
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

  useEffect(() => {
    fetchBlockchains();
  }, [paginate, search, sort]);

  return (
    <Box>
      <DataTableHead
        title="Blockchains"
        btnText="Add New"
        disabled={!userRole || !canAdd(userRole as unknown as UserRole)}
        onClick={async () => {
          navigate("manage");
        }}
      />

      <Box py={2}>
        <SearchBar
          placeholder="Search..."
          value={search}
          onChange={(text: string) => setSearch(text)}
        />
      </Box>

      <DataTable
        columns={[...Columns, lastColumn]}
        dataSource={rows}
        loading={loading}
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
export default BlockchainsPage;
