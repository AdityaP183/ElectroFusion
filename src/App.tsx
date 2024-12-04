import { ThemeProvider } from "next-themes";
import ThemeDataProvider from "./context/theme/themeDataProvider";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
	useNavigate,
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
import { useEffect } from "react";
import useFetch from "./context/store/useFetch";
import { getCurrentUser } from "./db/apiAuth";
import { fusionStore } from "./store/store";
import { User } from "./types/component.type";

const queryClient = new QueryClient();

const AppContent = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isRestrictedPath =
		location.pathname.startsWith("/vendor") ||
		location.pathname.startsWith("/admin");

	const {
		data,
		error,
		loading,
		fn: getLoggedUser,
	} = useFetch(getCurrentUser);
	const { user, setUser } = fusionStore();

	useEffect(() => {
		// if (user && ["/login", "/register"].includes(location.pathname)) {
		// 	navigate("/home");
		// 	return;
		// }
		if (loading || error || user) return;

		const fetchUser = async () => {
			await getLoggedUser();
			if (data) {
				const extractedUser: User = {
					id: data.id,
					email: data.email || "",
					firstName: data.user_metadata?.firstName,
					lastName: data.user_metadata?.lastName,
					role: data.user_metadata?.role,
					avatar: data.user_metadata?.avatar,
					createdAt: data.created_at,
				};
				setUser(extractedUser);
			}
		};
		fetchUser();
	}, [
		getLoggedUser,
		loading,
		error,
		data,
		setUser,
		user,
		navigate,
		location.pathname,
	]);

	return (
		<>
			{!isRestrictedPath && <Navbar />}

			<Routes>
				{/* Public Routes */}
				<Route
					path="/"
					element={
						<StoreLayout>
							<Landing />
						</StoreLayout>
					}
				/>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/contact" element={<ContactUs />} />
				<Route path="/about" element={<AboutUs />} />

				{/* Shared Routes for Authenticated Users */}
				<Route
					path="/home"
					element={
						<StoreLayout>
							<Home />
						</StoreLayout>
					}
				/>
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

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<ThemeProvider
		defaultTheme="dark"
		attribute="class"
		enableSystem
		disableTransitionOnChange
	>
		<ThemeDataProvider>
			<QueryClientProvider client={queryClient}>
				{children}
				<Toaster toastOptions={toastOptions} />
			</QueryClientProvider>
		</ThemeDataProvider>
	</ThemeProvider>
);

const App = () => (
	<Router>
		<Providers>
			<AppContent />
		</Providers>
	</Router>
);

export default App;
