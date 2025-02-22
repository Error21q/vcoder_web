import { IForm } from "../interfaces/form";

export const AuthInputFields: IForm[] = [
  { name: "username", label: "Username", type: "text", required: true },
  { name: "password", label: "Password", type: "password", required: true },
];

export const CategoryInputFields: IForm[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "description", label: "Description", type: "text", required: true },
];

export const BlockChainInputFields: IForm[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "currency", label: "Currency", type: "text", required: true },
  { name: "url", label: "URL", type: "text", required: true },
];

export const ProductInputFields: IForm[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "url", label: "Demo URL", type: "text", required: true },
  { name: "roi", label: "ROI", type: "number", required: true },
  { name: "commission", label: "Commission", type: "number", required: true },
  { name: "level", label: "Level", type: "number", required: true },
  {
    isSelect: true,
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Select category",
    required: true,
  },
  {
    isSelect: true,
    name: "blockchain",
    label: "Blockchain",
    type: "text",
    placeholder: "Select blockchain",
    required: true,
  },
  {
    isSelect: true,
    name: "status",
    label: "Status",
    type: "text",
    placeholder: "Select status",
    required: true,
  },
];

export const BookingInputFields: IForm[] = [
  {
    isSelect: true,
    name: "product",
    label: "Product",
    type: "any",
    placeholder: "Select a product",
    required: true,
  },
  {
    isSelect: true,
    name: "status",
    label: "Status",
    type: "text",
    placeholder: "Select status",
    required: true,
  },
  {
    name: "email_address",
    label: "Email address",
    type: "text",
    required: true,
  },
  {
    name: "wallet_address",
    label: "Wallet address",
    type: "text",
    required: true,
  },
  { name: "refer_code", label: "Refer code", type: "text" },
  {
    name: "telegram_user",
    label: "Telegram username",
    type: "text",
  },
  {
    name: "telegram_group",
    label: "Telegram group",
    type: "text",
  },
  {
    name: "whatsapp_number",
    label: "WhatsApp number",
    type: "text",
    required: true,
  },
  {
    name: "contract_address",
    label: "Contract address",
    type: "text",
  },
  {
    name: "domain_name",
    label: "Website",
    type: "text",
  },
  {
    name: "cancel_reason",
    label: "Cancel reason",
    type: "text",
  },
];

export const BookingActionInputFields: IForm[] = [
  {
    name: "domain_name",
    label: "Domain name",
    type: "text",
    required: true,
    placeholder: "https://vcoder.io",
  },
  {
    name: "contract_address",
    label: "Contract address",
    type: "text",
    required: true,
    placeholder: "0x7aa9B40e30BB5...",
  },
  {
    name: "cancel_reason",
    label: "Cancel reason",
    type: "text",
    required: true,
    placeholder: "unsatisfactory information",
  },
];
