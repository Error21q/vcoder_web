import { TableColumnsType } from "antd";
import { IPlan } from "../../interfaces/plan";
import moment from "moment";

export const Columns: TableColumnsType<IPlan> = [
  {
    title: "Name",
    width: 150,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ROI (%)",
    width: 100,
    dataIndex: "roi",
    key: "roi",
  },
  {
    title: "Referral (%)",
    width: 100,
    dataIndex: "referral",
    key: "referral",
  },
  {
    title: "Level(s)",
    width: 100,
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Description",
    width: 300,
    dataIndex: "description",
    key: "description",
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
