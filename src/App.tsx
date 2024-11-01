import { ThemeProvider } from "next-themes";
import ThemeDataProvider from "./context/theme/themeDataProvider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AboutUs, ContactUs, Home, Login, Register } from "./pages/common";
import ProductDetails from "./pages/common/ProductDetails";
import AdminRoutes from "./layouts/routes/AdminRoutes";
import ProtectedRoute from "./layouts/routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Colors from "./pages/Colors";
import { toastOptions } from "./lib/utils";

const queryClient = new QueryClient();

const App = () => {
	return (
		<ThemeProvider
			defaultTheme="dark"
			attribute="class"
			enableSystem
			disableTransitionOnChange
		>
			<ThemeDataProvider>
				<QueryClientProvider client={queryClient}>
					<Router>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/colors" element={<Colors />} />
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route path="/contact" element={<ContactUs />} />
							<Route path="/about" element={<AboutUs />} />
							<Route
								path="/product/:id"
								element={<ProductDetails />}
							/>

							<Route
								path="/admin/*"
								element={
									<ProtectedRoute>
										<AdminRoutes />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</Router>
					<Toaster toastOptions={toastOptions} />
					{/* <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left"/> */}
				</QueryClientProvider>
			</ThemeDataProvider>
		</ThemeProvider>
	);
};

export default App;
