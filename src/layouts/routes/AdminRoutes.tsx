import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout";
import NotFound from "../pages/NotFound";
import {
	Coupons,
	Customer,
	Dashboard,
	Order,
	Products,
	Sales,
	Vendor,
} from "@/pages/admin";

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminLayout />}>
				<Route index element={<Navigate to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />

				<Route path="products" element={<Products />} />
				<Route path="product/:id" element={<h1>Product Details</h1>} />

				<Route path="vendors" element={<Vendor />} />
				<Route path="vendor/:id" element={<h1>Vendor Details</h1>} />

				<Route path="customers" element={<Customer />} />
				<Route
					path="customer/:id"
					element={<h1>Customer Details</h1>}
				/>

				<Route path="orders" element={<Order />} />
				<Route path="sales" element={<Sales />} />

				<Route path="coupons" element={<Coupons />} />
				<Route path="coupons/add" element={<h1>Coupons Add</h1>} />
				<Route
					path="coupons/edit/:id"
					element={<h1>Coupons Edit</h1>}
				/>
				<Route
					path="coupons/delete/:id"
					element={<h1>Coupons Delete</h1>}
				/>

				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default AdminRoutes;
