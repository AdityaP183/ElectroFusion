import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { tempUser } from "@/lib/app-data";
import { Cog, Heart, LogOut, Search, ShoppingCart } from "lucide-react";
import { fusionStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import useFetch from "@/context/store/useFetch";
import { logout } from "@/db/apiAuth";
import toast from "react-hot-toast";

const Navbar = () => {
	const [isFloating, setIsFloating] = useState<boolean>(false);
	const { pathname } = useLocation();
	const { user } = fusionStore();
	const navigate = useNavigate();

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

	const { role } = tempUser;
	const { loading, error, fn: logoutUser } = useFetch(logout);

	const handleUserLogout = async () => {
		await logoutUser();

		if (!error && !loading) {
			toast.success("Successfully logged out");
			navigate("/login");
		}

		if (error) {
			toast.error(error.message);
		}
	};

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
					<Link to="/home" className="mr-5">
						<div className="flex items-center gap-2 p-2">
							<Avatar shape="square" className="w-6 h-6">
								<AvatarImage src="/logo.svg" />
							</Avatar>
							<span className="text-xl font-bold font-ox">
								ElectroFusion
							</span>
						</div>
					</Link>
				</NavigationMenuList>
				<NavigationMenuList className="flex items-center gap-3 mr-3">
					{user ? (
						<>
							{role !== "customer" && (
								<NavigationMenuItem>
									<Link
										to={`/${role}`}
										className="px-2 py-1 text-sm font-bold rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
									>
										Dashboard
									</Link>
								</NavigationMenuItem>
							)}
							<NavigationMenuItem
								className={`p-2 cursor-pointer ${
									pathname === `/${role}/settings`
										? "bg-white/20 glass"
										: "hover:bg-secondary-foreground/20"
								} rounded-xl`}
							>
								<Link to={`/${role}/settings`}>
									<Cog />
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem
								className={`p-2 cursor-pointer ${
									pathname === `/search`
										? "bg-white/20 glass"
										: "hover:bg-secondary-foreground/20"
								} rounded-xl`}
							>
								<Link to="/search">
									<Search />
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem
								className={`p-2 cursor-pointer ${
									pathname === "/wishlist"
										? "bg-white/20 glass"
										: "hover:bg-secondary-foreground/20"
								} rounded-xl`}
							>
								<Link to="/wishlist">
									<Heart />
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem
								className={`p-2 rounded-xl cursor-pointer ${
									pathname === "/cart"
										? "bg-white/20 glass"
										: "hover:bg-secondary-foreground/20"
								}`}
							>
								<Link to="/cart">
									<ShoppingCart />
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem
								className="p-2 cursor-pointer rounded-xl hover:bg-secondary-foreground/20"
								onClick={handleUserLogout}
							>
								<LogOut />
							</NavigationMenuItem>
						</>
					) : (
						<>
							<NavigationMenuItem>
								<Button
									variant={"outline"}
									className="font-bold rounded-full"
									onClick={() =>
										navigate("/signup", { replace: true })
									}
								>
									Sign up
								</Button>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Button
									className="font-bold rounded-full"
									onClick={() =>
										navigate("/login", { replace: true })
									}
								>
									Login
								</Button>
							</NavigationMenuItem>
						</>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};

export default Navbar;
