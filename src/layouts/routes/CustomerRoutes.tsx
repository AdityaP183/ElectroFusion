import { Route, Routes } from "react-router-dom"
import NotFound from "../pages/NotFound"
import { Settings } from "@/pages/common";

const CustomerRoutes = () => {
	return (
		<Routes>
			<Route path="product/:id" element={<h1>Product Details</h1>} />

			<Route path="vendor/:id" element={<h1>Vendor Details</h1>} />

			<Route path="order" element={<h1>Order</h1>} />
			<Route path="order/:id" element={<h1>Order Details</h1>} />

			<Route path="coupons" element={<h1>Coupons</h1>} />

			<Route path="settings" element={<Settings />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default CustomerRoutes
