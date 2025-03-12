import { Image, TableColumnsType } from "antd";
import { IBlockchain } from "../../interfaces/blockchain";
import moment from "moment";

export const Columns: TableColumnsType<IBlockchain> = [
  {
    title: "Name",
    width: 200,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Logo",
    width: 200,
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
    width: 200,
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Scan URL",
    width: 200,
    dataIndex: "scan_url",
    key: "scan_url",
  },
  {
    title: "RPC URL",
    width: 200,
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
