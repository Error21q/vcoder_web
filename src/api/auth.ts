import { IAuth } from "../interfaces/auth";
import Request from "./Request";

export const login = async (data: IAuth) => {
  try {
    const response = await Request.post(
      import.meta.env.VITE_API_AUTH_LOGIN,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  localStorage.removeItem("access_token");
  return true;
};
