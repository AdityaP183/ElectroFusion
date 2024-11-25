import { ThemeProvider } from "next-themes";
import ThemeDataProvider from "./context/theme/themeDataProvider";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";
import {
	AboutUs,
	ContactUs,
	ForgotPassword,
	Home,
	Login,
	Register,
	ResetPassword,
} from "./pages/common";
import AdminRoutes from "./layouts/routes/AdminRoutes";
import ProtectedRoute from "./layouts/routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toastOptions } from "./lib/utils";
import VendorRoutes from "./layouts/routes/VendorRoutes";
import { Cart, Checkout, ProductDetails, SearchProducts } from "./pages/store";
import Navbar from "./components/app/store/Navbar";
import Footer from "./layouts/pages/Footer";
import StoreLayout from "./layouts/pages/StoreLayout";
import CustomerRoutes from "./layouts/routes/CustomerRoutes";
import Landing from "./pages/common/Landing";

const queryClient = new QueryClient();

const AppContent = () => {
	const location = useLocation();

	const isRestrictedPath =
		location.pathname.startsWith("/vendor") ||
		location.pathname.startsWith("/admin");

	return (
		<>
			{!isRestrictedPath && <Navbar />}

			<Routes>
				<Route
					path="/"
					element={
						<StoreLayout>
							<Landing />
						</StoreLayout>
					}
				/>
				<Route
					path="/home"
					element={
						<StoreLayout>
							<Home />
						</StoreLayout>
					}
				/>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/contact" element={<ContactUs />} />
				<Route path="/about" element={<AboutUs />} />
				<Route
					path="/search"
					element={
						<StoreLayout>
							<SearchProducts />
						</StoreLayout>
					}
				/>
				<Route
					path="/cart"
					element={
						<StoreLayout>
							<Cart />
						</StoreLayout>
					}
				/>
				<Route
					path="/checkout"
					element={
						<StoreLayout>
							<Checkout />
						</StoreLayout>
					}
				/>
				<Route path="/products/:id" element={<ProductDetails />} />

				<Route
					path="/customer/*"
					element={
						<ProtectedRoute>
							<StoreLayout>
								<CustomerRoutes />
							</StoreLayout>
						</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/*"
					element={
						<ProtectedRoute>
							<AdminRoutes />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/vendor/*"
					element={
						<ProtectedRoute>
							<VendorRoutes />
						</ProtectedRoute>
					}
				/>
			</Routes>

			{!isRestrictedPath && (
				<StoreLayout>
					<Footer />
				</StoreLayout>
			)}
		</>
	);
};

const App = () => (
	<Router>
		<ThemeProvider
			defaultTheme="dark"
			attribute="class"
			enableSystem
			disableTransitionOnChange
		>
			<ThemeDataProvider>
				<QueryClientProvider client={queryClient}>
					<AppContent />
					<Toaster toastOptions={toastOptions} />
					{/* <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left"/> */}
				</QueryClientProvider>
			</ThemeDataProvider>
		</ThemeProvider>
	</Router>
);

export default App;
