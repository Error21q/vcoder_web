import { Image, TableColumnsType } from "antd";
import { IBlockchain } from "../../interfaces/blockchain";
import moment from "moment";

export const Columns: TableColumnsType<IBlockchain> = [
  {
    title: "Name",
    width: 100,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Logo",
    width: 100,
    dataIndex: "logo",
    key: "logo",
    render(value) {
      return (
        <Image
          preview={false}
          src={value}
          height={50}
          alt="blockchain-image"
          fallback={import.meta.env.VITE_DEFAULT_IMAGE}
        />
      );
    },
  },
  {
    title: "Currency",
    width: 100,
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Chain ID",
    width: 100,
    dataIndex: "chain_id",
    key: "chain_id",
  },
  {
    title: "Scan URL",
    width: 250,
    dataIndex: "scan_url",
    key: "scan_url",
  },
  {
    title: "RPC URL",
    width: 250,
    dataIndex: "rpc_url",
    key: "rpc_url",
  },
  {
    title: "Created At",
    width: 200,
    dataIndex: "created_at",
    key: "created_at",
    sorter: true,
    render(value) {
      return moment(value).format(import.meta.env.VITE_TIME_STAMP);
    },
  },
  {
    title: "Updated At",
    width: 200,
    dataIndex: "updated_at",
    key: "updated_at",
    sorter: true,
    render(value) {
      return moment(value).format(import.meta.env.VITE_TIME_STAMP);
    },
  },
];
