import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StoreLayout from "../pages/store-layout";
import { Cart, Checkout, Home, Search } from "@/pages/customers";

const CustomerRoutes: React.FC = () => {
	return (
		<StoreLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="search" element={<Search />} />
				<Route path="cart" element={<Cart />} />
				<Route path="checkout" element={<Checkout />} />
			</Routes>
			<Outlet />
		</StoreLayout>
	);
};

export default CustomerRoutes;
