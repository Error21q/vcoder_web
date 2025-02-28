import { IBlockchain } from "./blockchain";
import { IPlan } from "./plan";
import { IBooking } from "./booking";
import { ProductStatusType } from "../common/product-utils";
import { ReactNode } from "react";

export interface IProduct {
  id: number;
  image: string;
  url: string;
  name: string;
  status?: ProductStatusType | null;
  plan: IPlan;
  blockchain: IBlockchain;
  bookings?: IBooking[];
  created_at?: string;
  updated_at?: string;
}

export interface IProductInfo {
  title: React.ReactNode | number | string | undefined;
  value: React.ReactNode | number | string | undefined;
}

export interface IProductFilter {
  blockchainId?: number | null;
  level?: number | null;
  roi?: number | null;
  referral?: number | null;
  status?: ProductStatusType | null;
}

export interface IProductFilterFields {
  label: string;
  key: keyof IProductFilter;
  options: {
    value: number | string;
    label: string;
    icon?: ReactNode;
    logo?: string;
  }[];
}
