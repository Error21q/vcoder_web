import { IBlockchain } from "../interfaces/blockchain";
import { IPlan } from "../interfaces/plan";
import { IBooking, IBookingAction } from "../interfaces/booking";
import { IProduct, IProductFilter } from "../interfaces/product";
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
  scan_url: "",
  rpc_url: "",
};

export const PlanInitialValues: IPlan = {
  id: 0,
  name: "",
  description: "",
  roi: null,
  referral: null,
  level: null,
};

export const ProductInitialValues: IProduct = {
  id: 0,
  image: "",
  url: "",
  name: "",
  status: null,
  blockchain: BlockchainInitialValues,
  plan: PlanInitialValues,
};

export const BookingInitialValues: IBooking = {
  id: 0,
  email_address: "",
  wallet_address: "",
  refer_code: "",
  telegram_user: "",
  telegram_group: "",
  whatsapp_number: "",
  country_code: "",
  audio: "",
  status: "pending",
  product: ProductInitialValues,
};

export const BookingActionInitialValues: IBookingAction = {
  domain_name: "",
  contract_address: "",
  cancel_reason: "",
};

export const ProductFilterInitialValues: IProductFilter = {
  status: null,
  blockchainId: null,
  level: null,
  roi: null,
  referral: null,
};
