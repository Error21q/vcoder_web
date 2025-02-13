import { IBooking } from "../interfaces/booking";
import Request from "./Request";

export const getBookings = async (
  search?: string,
  page?: number,
  limit?: number,
  sort?: string,
  filters?: { status?: string }
) => {
  try {
    let url: string = import.meta.env.VITE_API_BOOKING + "?";
    if (search) url += `search=${search}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (sort) url += `sort=${sort}&`;
    if (filters?.status) url += `status=${filters.status}&`;

    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBooking = async (id: number | string) => {
  try {
    const response = await Request.get(
      `${import.meta.env.VITE_API_BOOKING}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveBooking = async (data: IBooking) => {
  try {
    const response = await Request.post(
      `${import.meta.env.VITE_API_BOOKING}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeBooking = async (id: number) => {
  try {
    const response = await Request.delete(
      `${import.meta.env.VITE_API_BOOKING}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const summaryBookings = async (date?: string) => {
  try {
    let url: string = import.meta.env.VITE_API_BOOKING_SUMMARY + "?";
    if (date) url += `search=${date}`;

    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
