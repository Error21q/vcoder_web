import { useJwt } from "react-jwt";
import { useState, useEffect } from "react";

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

export const getAccessToken = () => {
  return localStorage.getItem("access_token") || "";
};

export const useUserRole = () => {
  const rawAccessToken = getAccessToken();
  const { decodedToken } = useJwt(rawAccessToken);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (decodedToken && (decodedToken as any).role) {
      setRole((decodedToken as any).role);
    }
  }, [decodedToken]);

  return role;
};
