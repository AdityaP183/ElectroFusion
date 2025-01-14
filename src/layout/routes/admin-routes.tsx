import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminVendorLayout from "../pages/admin-vendor-layout";
import { Dashboard, ManageProduct, Orders, Products } from "@/pages/admin";
import { Settings } from "@/pages/common";

const AdminRoutes: React.FC = () => {
	return (
		<AdminVendorLayout>
			<Routes>
				<Route path="/" element={<Navigate to="dashboard" replace />} />
				<Route path="dashboard" element={<Dashboard />} />

				<Route path="products" element={<Products />} />
				<Route path="products/:id" element={<ManageProduct />} />

				<Route path="orders" element={<Orders />} />

				<Route path="settings" element={<Settings />} />
			</Routes>
			<Outlet />
		</AdminVendorLayout>
	);
};

export default AdminRoutes;
