import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import fusionStore from "@/stores/userStore";
import { Home, LogOut, Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = {
	user: [
		{ title: "Home", icon: Home, path: "/store/" },
		{ title: "Search", icon: Search, path: "/store/search" },
		{ title: "Cart", icon: ShoppingCart, path: "/store/cart" },
		{ title: "Logout", icon: LogOut, path: "/logout" },
	],
	noAuth: [
		{ title: "Login", path: "/login" },
		{ title: "Register", path: "/register" },
	],
};

export default function Navbar() {
	const [isFloating, setIsFloating] = useState<boolean>(false);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { user } = fusionStore();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 60) {
				setIsFloating(true);
			} else {
				setIsFloating(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`mx-auto max-w-[80vw] py-1 border border-border mt-2 mb-4 rounded-full z-50 ${
				isFloating
					? "fixed top-3 left-0 right-0 mx-auto shadow-lg bg-secondary/80 glass"
					: "bg-transparent"
			}`}
		>
			<NavigationMenu className="flex items-center justify-between max-w-full px-2">
				<NavigationMenuList className="flex items-center">
					<NavigationMenuItem
						className="mr-5"
						onClick={() => navigate("/")}
					>
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<Avatar shape="square" className="w-6 h-6">
								<AvatarImage src="/logo.svg" />
							</Avatar>
							<span className="text-xl font-bold font-ox">
								ElectroFusion
							</span>
						</div>
					</NavigationMenuItem>
				</NavigationMenuList>
				<NavigationMenuList className="flex items-center gap-3 mr-3">
					{/* If user is a vendor or admin */}
					{user &&
						["admin", "vendor"].includes(
							user.user_metadata.role
						) && (
							<>
								<NavigationMenuItem
									onClick={() =>
										navigate(`/${user.user_metadata.role}`)
									}
									className="cursor-pointer"
								>
									<div className="px-2 py-1 text-sm font-bold rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
										Dashboard
									</div>
								</NavigationMenuItem>
								<NavigationMenuItem
									className="p-2 cursor-pointer rounded-xl hover:bg-secondary-foreground/20"
									onClick={() => navigate("/logout")}
								>
									<LogOut />
								</NavigationMenuItem>
							</>
						)}

					{/* is user is not logged in */}
					{!user &&
						navItems.noAuth.map((item) => (
							<NavigationMenuItem key={item.title}>
								<Button
									variant={
										item.title === "Login"
											? "default"
											: "outline"
									}
									className="font-bold rounded-full"
									onClick={() =>
										navigate(item.path, { replace: true })
									}
								>
									{item.title}
								</Button>
							</NavigationMenuItem>
						))}

					{/* if user is logged in and is a customer */}
					{user && user.user_metadata.role === "customer" && (
						<>
							{navItems.user.map((item) => (
								<NavigationMenuItem
									key={item.title}
									className={`p-2 cursor-pointer ${
										pathname === item.path
											? "bg-white/20 glass"
											: "hover:bg-secondary-foreground/20"
									} rounded-xl`}
									onClick={() => navigate(item.path)}
								>
									<item.icon />
								</NavigationMenuItem>
							))}
							<NavigationMenuItem className="inline-flex gap-1 p-1 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none">
									<Avatar className="w-8 h-8">
										<AvatarImage
											src={user.user_metadata.avatar}
											alt={user.user_metadata.firstName}
										/>
										<AvatarFallback>
											{user.user_metadata.firstName[0]}
										</AvatarFallback>
									</Avatar>
									<p>
										{user.user_metadata.firstName +
											" " +
											user.user_metadata.lastName}
									</p>
							</NavigationMenuItem>
						</>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
