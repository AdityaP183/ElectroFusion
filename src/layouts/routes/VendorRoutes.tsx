import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import VendorLayout from "../pages/VendorLayout";
import { Dashboard, Order, Product, Sales } from "@/pages/vendor";
import { Settings } from "@/pages/common";

const VendorRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<VendorLayout />}>
				<Route index element={<Navigate to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />

				<Route path="settings" element={<Settings />} />

				<Route path="products" element={<Product />} />
				<Route path="product/add" element={<h1>Product</h1>} />
				<Route path="product/:id" element={<h1>Product Details</h1>} />

				<Route path="orders" element={<Order />} />
				<Route path="orders/:id" element={<h1>Order</h1>} />

				{/* <Route path="" element={<h1>Coupons</h1>} /> */}

				<Route path="sales" element={<Sales />} />

				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default VendorRoutes
