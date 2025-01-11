import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminVendorLayout from "../pages/admin-vendor-layout";
import { AddProduct, AllProducts } from "@/pages/vendor";
import { Settings } from "@/pages/common";

const VendorRoutes: React.FC = () => {
	return (
		<AdminVendorLayout>
			<Routes>
				<Route path="/" element={<Navigate to="dashboard" replace />} />
				<Route path="dashboard" element={<h1>Vendor Dashboard</h1>} />

                <Route path="products" element={<AllProducts/>} />
                <Route path="products/add" element={<AddProduct/>} />

                <Route path="settings" element={<Settings/>} />
			</Routes>
			<Outlet />
		</AdminVendorLayout>
	);
};

export default VendorRoutes;
