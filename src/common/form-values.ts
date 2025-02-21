import { IBlockchain } from "../interfaces/blockchain";
import { ICategory } from "../interfaces/category";
import { IBooking, IBookingAction } from "../interfaces/booking";
import { IProduct } from "../interfaces/product";
import { IAuth } from "../interfaces/auth";

export const AuthInitialValues: IAuth = {
  username: "",
  password: "",
};

export const BlockchainInitialValues: IBlockchain = {
  id: 0,
  name: "",
  currency: "",
  logo: "",
  url: "",
};

export const CategoryInitialValues: ICategory = {
  id: 0,
  name: "",
  description: "",
};

export const ProductInitialValues: IProduct = {
  id: 0,
  image: "",
  url: "",
  name: "",
  status: null,
  roi: null,
  commission: null,
  level: null,
  blockchain: BlockchainInitialValues,
  category: CategoryInitialValues,
};

export const BookingInitialValues: IBooking = {
  id: 0,
  email_address: "",
  wallet_address: "",
  refer_code: "",
  telegram_user: "",
  telegram_group: "",
  whatsapp_number: "",
  audio: "",
  status: "pending",
  product: ProductInitialValues,
};

export const BookingActionInitialValues: IBookingAction = {
  domain_name: "",
  contract_address: "",
  cancel_reason: "",
};
