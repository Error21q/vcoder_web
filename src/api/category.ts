import { ICategory } from "../interfaces/category";
import Request from "./Request";

export const getCategories = async (
  search?: string,
  page?: number,
  limit?: number,
  sort?: string
) => {
  try {
    let url: string = import.meta.env.VITE_API_CATEGORY + "?";
    if (search) url += `search=${search}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (sort) url += `sort=${sort}`;

    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveCategory = async (data: ICategory) => {
  try {
    const response = await Request.post(
      `${import.meta.env.VITE_API_CATEGORY}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCategory = async (id: number) => {
  try {
    const response = await Request.delete(
      `${import.meta.env.VITE_API_CATEGORY}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
