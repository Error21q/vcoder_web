import { IPlan } from "../interfaces/plan";
import Request from "./Request";

export const getPlans = async (
  search?: string,
  page?: number,
  limit?: number,
  sort?: string
) => {
  try {
    let url: string = import.meta.env.VITE_API_PLAN + "?";
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

export const savePlan = async (data: IPlan) => {
  try {
    const response = await Request.post(
      `${import.meta.env.VITE_API_PLAN}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removePlan = async (id: number) => {
  try {
    const response = await Request.delete(
      `${import.meta.env.VITE_API_PLAN}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
