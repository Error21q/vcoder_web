import { TableColumnsType } from "antd";
import { ICategory } from "../../interfaces/category";
import moment from "moment";

export const Columns: TableColumnsType<ICategory> = [
  {
    title: "Name",
    width: 200,
    dataIndex: "name",
    key: "name",
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
