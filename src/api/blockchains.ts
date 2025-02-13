import { IBlockchain } from "../interfaces/blockchain";
import Request from "./Request";

export const getBlockchains = async (
  search?: string,
  page?: number,
  limit?: number,
  sort?: string
) => {
  try {
    let url: string = import.meta.env.VITE_API_BLOCKCHAIN + "?";
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

export const saveBlockchain = async (data: IBlockchain) => {
  try {
    const response = await Request.post(
      `${import.meta.env.VITE_API_BLOCKCHAIN}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeBlockchain = async (id: number) => {
  try {
    const response = await Request.delete(
      `${import.meta.env.VITE_API_BLOCKCHAIN}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
