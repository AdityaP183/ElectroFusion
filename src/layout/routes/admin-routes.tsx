import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminVendorLayout from "../pages/admin-vendor-layout";

const AdminRoutes: React.FC = () => {
	return (
		<AdminVendorLayout>
			<Routes>
				<Route path="/" element={<Navigate to="dashboard" replace />} />
				<Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
			</Routes>
			<Outlet />
		</AdminVendorLayout>
	);
};

export default AdminRoutes;
