import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";

const VendorRoutes = () => {
    return (
		<Routes>
			<Route path="/" element={<VendorRoutes />}>

				<Route index element={<Navigate to="dashboard" />} />
				<Route path="dashboard" element={<h1>Dashboard</h1>} />
				
                <Route path="product" element={<h1>Product</h1>} />
                <Route path="product/add" element={<h1>Product</h1>} />
				<Route path="product/:id" element={<h1>Product Details</h1>} />
                
                <Route path="order" element={<h1>Order</h1>} />
                <Route path="order/:id" element={<h1>Order</h1>} />

                <Route path="sales" element={<h1>Sales</h1>} />
				
                <Route path="*" element={<NotFound/>} />
			
            </Route>
		</Routes>
	);
}

export default VendorRoutes
