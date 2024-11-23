import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { tempUser } from "@/lib/app-data";
import { Cog, Heart, Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
	const [isFloating, setIsFloating] = useState<boolean>(false);
	const { pathname } = useLocation();

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
					<Link to="/" className="mr-5">
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
					{role !== "customer" && (
						<NavigationMenuItem>
							<Link
								to={`/${role}`}
								className="px-2 py-1 text-sm font-bold rounded-md bg-primary"
							>
								Dashboard
							</Link>
						</NavigationMenuItem>
					)}
					<NavigationMenuItem
						className={`p-2 ${
							pathname === `/${role}/settings`
								? "bg-white/20 glass"
								: ""
						} rounded-xl`}
					>
						<Link to={`/${role}/settings`}>
							<Cog />
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem
						className={`p-2 ${
							pathname === `/search` ? "bg-white/20 glass" : ""
						} rounded-xl`}
					>
						<Link to="/search">
							<Search />
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem
						className={`p-2 ${
							pathname === "/wishlist" ? "bg-white/20 glass" : ""
						} rounded-xl`}
					>
						<Link to="/wishlist">
							<Heart />
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem
						className={`p-2 rounded-xl ${
							pathname === "/cart" ? "bg-white/20 glass" : ""
						}`}
					>
						<Link to="/cart">
							<ShoppingCart />
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};

export default Navbar;
