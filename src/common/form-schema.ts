import * as yup from "yup";
import { BookingStatusType } from "./booking-utils";

export const AuthValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const BlockchainValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  currency: yup.string().required("Currency is required"),
  chain_id: yup.number().required("Chain ID is required"),
  scan_url: yup
    .string()
    .required("Scan URL is required")
    .url("Scan URL must be a valid URL"),
  rpc_url: yup
    .string()
    .required("RPC URL is required")
    .url("RPC URL must be a valid URL"),
});

export const PlanValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  roi: yup
    .number()
    .required("ROI is required")
    .moreThan(0, "ROI must be greater than 0"),
  referral: yup
    .number()
    .required("Referral is required")
    .moreThan(0, "Referral must be greater than 0"),
  level: yup
    .number()
    .required("Level is required")
    .moreThan(0, "Level must be greater than 0"),
});

export const ProductValidationSchema = yup.object().shape({
  plan: yup.object().required("Plan is required"),
  blockchain: yup.object().required("Blockchain is required"),
  url: yup
    .string()
    .required("URL is required")
    .url("Demo URL must be a valid URL"),
  name: yup.string().required("Name is required"),
  status: yup.string().required("Status is required"),
});

export const BookingValidationSchema = yup.object().shape({
  email_address: yup
    .string()
    .required("Email address is required")
    .email("Invalid email address"),
  wallet_address: yup.string().required("Wallet address is required"),
  whatsapp_number: yup.string().required("WhatsApp number is required"),
  refer_code: yup
    .string()
    .optional()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Use only letters (A-Z, a-z) and numbers (0-9)."
    ),
  telegram_user: yup
    .string()
    .optional()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Use only letters (A-Z, a-z) and numbers (0-9)."
    ),
  telegram_group: yup
    .string()
    .optional()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Use only letters (A-Z, a-z) and numbers (0-9)."
    ),
  product: yup.object().required("Product is required"),
  status: yup.string().required("Status is required"),
});

export const getDynamicBookingActionValidationSchema = (
  status: BookingStatusType
) => {
  return yup.object().shape({
    contract_address:
      status === "delivered"
        ? yup
            .string()
            .required("Contract address is required")
            .matches(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters allowed")
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
