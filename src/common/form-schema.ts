import * as yup from "yup";
import { BookingStatusType } from "./booking-utils";

export const AuthValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const BlockchainValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  currency: yup.string().required("Currency is required"),
  url: yup
    .string()
    .required("URL is required")
    .url("Blockchain URL must be a valid URL"),
});

export const CategoryValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

export const ProductValidationSchema = yup.object().shape({
  category: yup.object().required("Category is required"),
  blockchain: yup.object().required("Blockchain is required"),
  url: yup
    .string()
    .required("URL is required")
    .url("Product URL must be a valid URL"),
  name: yup.string().required("Name is required"),
  status: yup.string().required("Status is required"),
  roi: yup
    .number()
    .required("ROI is required")
    .moreThan(0, "ROI must be greater than 0"),
  commission: yup
    .number()
    .required("Commission is required")
    .moreThan(0, "Commission must be greater than 0"),
  level: yup
    .number()
    .required("Level is required")
    .moreThan(0, "Level must be greater than 0"),
});

export const BookingValidationSchema = yup.object().shape({
  email_address: yup
    .string()
    .required("Email address is required")
    .email("Invalid email address"),
  wallet_address: yup.string().required("Wallet address is required"),
  whatsapp_number: yup.string().required("WhatsApp number is required"),
  product: yup.object().required("Product is required"),
  status: yup.string().required("Status is required"),
});

export const getDynamicBookingActionValidationSchema = (
  status: BookingStatusType
) => {
  return yup.object().shape({
    contract_address:
      status === "delivered"
        ? yup.string().required("Contract address is required")
        : yup.string().optional(),
    domain_name:
      status === "delivered"
        ? yup
            .string()
            .required("Domain name is required")
            .url("Invalid domain name")
        : yup.string().optional(),
    cancel_reason:
      status === "cancelled"
        ? yup.string().required("Cancel reason is required")
        : yup.string().optional(),
  });
};
