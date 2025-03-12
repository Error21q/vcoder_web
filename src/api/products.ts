import { IProduct, IProductFilter } from "../interfaces/product";
import Request from "./Request";

export const getProducts = async (
  search?: string,
  page?: number,
  limit?: number,
  sort?: string,
  filters?: IProductFilter,
  shuffle?: boolean
) => {
  try {
    let url: string = import.meta.env.VITE_API_PRODUCT + "?";
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (sort) url += `sort=${encodeURIComponent(sort)}&`;
    if (shuffle) url += `shuffle=${shuffle}&`;

    if (filters)
      url += `filters=${encodeURIComponent(JSON.stringify(filters))}&`;

    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id: number | string) => {
  try {
    const response = await Request.get(
      `${import.meta.env.VITE_API_PRODUCT}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveProduct = async (data: IProduct) => {
  try {
    const response = await Request.post(
      `${import.meta.env.VITE_API_PRODUCT}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeProduct = async (id: number) => {
  try {
    const response = await Request.delete(
      `${import.meta.env.VITE_API_PRODUCT}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
