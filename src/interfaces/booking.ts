import React from "react";
import { BookingStatusType } from "../common/booking-utils";
import { IProduct } from "./product";
import { ColorPaletteProp, VariantProp } from "@mui/joy";

export interface IBooking {
  id: number;
  wallet_address: string;
  email_address: string;
  booking_id?: string | null;
  domain_name?: string | null;
  contract_address?: string | null;
  telegram_group?: string;
  whatsapp_number: string;
  country_code?: string;
  telegram_user?: string;
  audio: string;
  refer_code?: string | null;
  status?: BookingStatusType | null;
  approved_time?: string | null;
  deliver_time?: string | null;
  cancel_time?: string | null;
  cancel_reason?: string | null;
  delivery_date?: string | null;
  created_at?: string;
  updated_at?: string;
  product: IProduct;
}

export interface IBookingSummary {
  today_bookings: number;
  pending_bookings: number;
  approved_bookings: number;
  cancelled_bookings: number;
  delivered_bookings: number;
  today_delivered: number;
  monthly_delivered: number;
}

export interface IBookingStats {
  avatar: React.ReactNode;
  title: string;
}

export interface IBookingInfo {
  title: React.ReactNode | number | string | undefined;
  value: React.ReactNode | number | string | undefined;
}

export interface IBookingStepper {
  title: string;
  description: string;
  isCompleted?: boolean;
  icon?: React.ReactNode;
  variant?: VariantProp;
  color?: ColorPaletteProp;
}

export interface IBookingAction {
  domain_name?: string;
  contract_address?: string;
  cancel_reason?: string;
}
