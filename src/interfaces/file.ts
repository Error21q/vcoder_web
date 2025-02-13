import { UploadFileStatus } from "antd/es/upload/interface";

export interface IFileList {
  uid?: string;
  name?: string;
  status?: UploadFileStatus;
  percent?: number;
  url?: string;
}
