import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminVendorLayout from "../pages/admin-vendor-layout";
import {
	AddProduct,
	AllOrders,
	AllProducts,
	Dashboard,
	EditProduct,
	ManageOrders,
} from "@/pages/vendor";
import { Settings } from "@/pages/common";

const VendorRoutes: React.FC = () => {
	return (
		<AdminVendorLayout>
			<Routes>
				<Route path="/" element={<Navigate to="dashboard" replace />} />
				<Route path="dashboard" element={<Dashboard />} />

				<Route path="products" element={<AllProducts />} />
				<Route path="products/add" element={<AddProduct />} />
				<Route path="products/edit/:id" element={<EditProduct />} />

				<Route path="orders" element={<AllOrders />} />
				<Route path="orders/manage/:id" element={<ManageOrders />} />

				<Route path="settings" element={<Settings />} />
			</Routes>
			<Outlet />
		</AdminVendorLayout>
	);
};

export default VendorRoutes;
