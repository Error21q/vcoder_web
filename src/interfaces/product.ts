import { IBlockchain } from "./blockchain";
import { ICategory } from "./category";
import { IBooking } from "./booking";
import { ProductStatusType } from "../common/product-utils";

export interface IProduct {
  id: number;
  image: string;
  url: string;
  name: string;
  roi: number | null;
  commission: number | null;
  level: number | null;
  status?: ProductStatusType | null;
  category: ICategory;
  blockchain: IBlockchain;
  bookings?: IBooking[];
  created_at?: string;
  updated_at?: string;
}

export interface IProductInfo {
  title: React.ReactNode | number | string | undefined;
  value: React.ReactNode | number | string | undefined;
}
