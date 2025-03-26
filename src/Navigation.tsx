import React, { useEffect } from "react";
import { useColorScheme } from "@mui/joy/styles";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components";
import {
  BlockchainsPage,
  DashboardPage,
  LoginPage,
  BookingsPage,
  ProductsPage,
  ManageBlockchain,
  ManageProduct,
  ManageBooking,
  ViewProduct,
  ViewBooking,
  HomePage,
  PlansPage,
  ManagePlan,
  TrackingPage,
} from "./pages";
import { ConfigProvider, theme } from "antd";
import { UserRole, useUserRole } from "./common/auth-utils";

const Navigation: React.FC = () => {
  const location = useLocation();
  const userRole = useUserRole();
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    if (location.pathname === "/") {
      setMode("dark");
    }
  }, [location.pathname, setMode]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Plus Jakarta Sans",
        },
        algorithm:
          mode == "dark" ? theme.darkAlgorithm : theme.compactAlgorithm,
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/track" element={<TrackingPage />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="bookings" element={<BookingsPage />} />
          <Route path="bookings/manage" element={<ManageBooking />} />
          <Route path="bookings/view/:bookingId" element={<ViewBooking />} />

          {userRole === UserRole.MANAGER ? (
            <Route path="*" element={<Navigate to="dashboard" />} />
          ) : (
            <>
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/manage" element={<ManageProduct />} />
              <Route
                path="products/view/:productId"
                element={<ViewProduct />}
              />

              <Route path="plans" element={<PlansPage />} />
              <Route path="plans/manage" element={<ManagePlan />} />

              <Route path="blockchains" element={<BlockchainsPage />} />
              <Route path="blockchains/manage" element={<ManageBlockchain />} />
            </>
          )}
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default Navigation;
