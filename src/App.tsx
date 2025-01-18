import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/app/common/theme-toggle";
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { toastOptions } from "./lib/utils";
import {
	ForgotPassword,
	Landing,
	Login,
	Logout,
	NotFound,
	Register,
	ResetPassword,
} from "./pages/common";
import StoreLayout from "./layout/pages/store-layout";
import fusionStore from "./stores/userStore";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/api-auth";
import { useEffect } from "react";
import { User } from "./lib/types/user-types";
import ProtectedRoute from "./layout/pages/protected-route";
import AdminRoutes from "./layout/routes/admin-routes";
import VendorRoutes from "./layout/routes/vendor-routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CustomerRoutes from "./layout/routes/customer-routes";

const query = new QueryClient();

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const {
		data,
		error,
		loading,
		fn: getLoggedUser,
	} = useFetch(getCurrentUser);
	const { user, setUser } = fusionStore();

	useEffect(() => {
		if (loading || error || user) return;

		const fetchUser = async () => {
			await getLoggedUser();
			if (data) {
				const extractedUser: User = {
					id: data.id,
					email: data.email || "",
					user_metadata: {
						firstName: data.user_metadata?.firstName,
						lastName: data.user_metadata?.lastName,
						role: data.user_metadata?.role,
						avatar: data.user_metadata?.avatar,
					},
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
	return <>{children}</>;
};

const router = createBrowserRouter([
	{
		element: (
			<AuthWrapper>
				<Outlet />
			</AuthWrapper>
		),
		children: [
			{
				path: "/",
				element: <StoreLayout />,
				children: [
					{ path: "/", element: <Landing /> },
					{ path: "login", element: <Login /> },
					{ path: "register", element: <Register /> },
					{ path: "not-found", element: <NotFound /> },
					{
						path: "logout",
						element: <Logout />,
					},
				],
			},
			{ path: "/forgot-password", element: <ForgotPassword /> },
			{ path: "/reset-password", element: <ResetPassword /> },
			{
				path: "/store/*",
				element: (
					<ProtectedRoute requiredRole="customer">
						<CustomerRoutes />
					</ProtectedRoute>
				),
			},
			{
				path: "/vendor/*",
				element: (
					<ProtectedRoute requiredRole="vendor">
						<VendorRoutes />
					</ProtectedRoute>
				),
			},
			{
				path: "/admin/*",
				element: (
					<ProtectedRoute requiredRole="admin">
						<AdminRoutes />
					</ProtectedRoute>
				),
			},
			{ path: "*", element: <NotFound /> },
		],
	},
]);

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<ThemeProvider defaultTheme="dark" storageKey="ef-ui-theme">
		{children}
		<Toaster toastOptions={toastOptions} />
	</ThemeProvider>
);

const App = () => (
	<QueryClientProvider client={query}>
		<Providers>
			<RouterProvider router={router} />
		</Providers>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);

export default App;
