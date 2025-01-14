import { Skeleton } from "@/components/ui/skeleton";
import { logoutUser } from "@/db/api-auth";
import useFetch from "@/hooks/use-fetch";
import fusionStore from "@/stores/userStore";
import { RefreshCw } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigate = useNavigate();
	const { data, error, fn: logout } = useFetch(logoutUser);
	const { setUser } = fusionStore();

	useEffect(() => {
		const performLogout = async () => {
			// Call the logout function
			await logout();
			setUser(null); // Clear user state

			setTimeout(() => {
				toast.success("Logged out successfully!");
				navigate("/login", { replace: true }); // Redirect to login
			}, 2000);
		};

		performLogout();

		// Optional: Timeout cleanup for navigation delay
		const performTimeout = setTimeout(() => {
			if (!data && !error) {
				toast.error("Logout timed out");
				navigate("/", { replace: true }); // Fallback in case of timeout
			}
		}, 5000); // 5 seconds timeout

		return () => clearTimeout(performTimeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="min-h-[60vh] relative my-10 flex items-center justify-center">
			<Skeleton className="absolute top-0 bottom-0 left-0 right-0" />
			<div className="flex flex-col items-center gap-10">
				<RefreshCw className="w-20 h-20 animate-spin" />
				<p className="text-2xl animate-bounce">
					Logging You Out Please Wait...
				</p>
			</div>
		</div>
	);
}
