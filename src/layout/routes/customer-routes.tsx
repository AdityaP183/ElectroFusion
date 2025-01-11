import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StoreLayout from "../pages/store-layout";

const CustomerRoutes: React.FC = () => {
	return (
		<StoreLayout>
			<Routes>
				<Route path="/" element={<h1>Store</h1>} />
				<Route path="search" element={<h1>Search</h1>} />
				<Route path="wishlist" element={<h1>Wishlist</h1>} />
				<Route path="cart" element={<h1>Cart</h1>} />
				<Route path="search" element={<h1>Search</h1>} />
			</Routes>
			<Outlet />
		</StoreLayout>
	);
};

export default CustomerRoutes;
