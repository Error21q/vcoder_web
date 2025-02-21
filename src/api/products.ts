import { IProduct, IProductFilter } from "../interfaces/product";
import Request from "./Request";

export const getProducts = async (
  search?: string,
  page?: number,
  limit?: number,
  sort?: string,
  filters?: IProductFilter
) => {
  try {
    let url: string = import.meta.env.VITE_API_PRODUCT + "?";
    if (search) url += `search=${search}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (sort) url += `sort=${sort}&`;
    if (filters?.blockchainId) url += `blockchainId=${filters.blockchainId}&`;
    if (filters?.status) url += `status=${filters.status}&`;

    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id: number) => {
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
