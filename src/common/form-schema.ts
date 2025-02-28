import * as yup from "yup";
import { BookingStatusType } from "./booking-utils";
import { validate } from "multicoin-address-validator";
import { PhoneNumberUtil } from "google-libphonenumber";

export const AuthValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
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

export const getBookingValidationSchema = (
  currency?: string,
  country_code?: string
) => {
  return yup.object().shape({
    email_address: yup
      .string()
      .required("Email address is required")
      .email("Invalid email address"),
    wallet_address: yup
      .string()
      .required("Wallet address is required")
      .test(
        "is-valid-wallet-address",
        "Invalid wallet address",
        (value) => !!value && validate(value, currency?.toLowerCase())
      ),
    whatsapp_number: yup
      .string()
      .required("WhatsApp number is required")
      .test("is-valid-whatsapp_number", "Invalid WhatsApp number", (value) => {
        if (!value) return false; // Required validation already handled
        const phoneUtil = PhoneNumberUtil.getInstance();
        const parsedNumber = phoneUtil.parseAndKeepRawInput(
          value,
          country_code
        );
        return phoneUtil.isValidNumberForRegion(parsedNumber, country_code);
      }),
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
};

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
