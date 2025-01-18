import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StoreLayout from "../pages/store-layout";
import { Cart, Checkout, Home, ProductInfo, Search } from "@/pages/customers";
import { Settings } from "@/pages/common";

const CustomerRoutes: React.FC = () => {
	return (
		<StoreLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="search" element={<Search />} />
				<Route path="cart" element={<Cart />} />
				<Route path="checkout" element={<Checkout />} />

				<Route path="product/:id" element={<ProductInfo />} />
				<Route path="settings" element={<Settings />} />
			</Routes>
			<Outlet />
		</StoreLayout>
	);
};

export default CustomerRoutes;
