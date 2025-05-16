"use client";

import { useAuth } from "@clerk/nextjs";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import NavbarCategories from "./navbar-categories";
import NavbarUserSection from "./navbar-user-section";

export default function Navbar() {
	const { isLoaded, isSignedIn } = useAuth();
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (typeof current === "number" && scrollYProgress) {
			const previous = scrollYProgress.getPrevious();

			if (typeof previous === "number") {
				const direction = current - previous;
				if (scrollYProgress.get() < 0.05) {
					setVisible(true);
				} else {
					setVisible(direction < 0);
				}
			}
		}
	});

	return (
		<AnimatePresence>
			<motion.header
				initial={{
					opacity: 1,
					y: 0,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
				className="fixed top-3 left-0 right-0 mx-auto max-w-[80vw] py-1 border border-border rounded-full z-50 backdrop-blur-sm bg-secondary/60 shadow-md transition-all duration-300 ease-in-out px-4 flex flex-col gap-1"
			>
				<MainNavbar isLoaded={isLoaded} isSignedIn={isSignedIn} />
			</motion.header>
		</AnimatePresence>
	);
}

function MainNavbar({
	isLoaded,
	isSignedIn,
}: {
	isLoaded: boolean;
	isSignedIn: boolean | undefined;
}) {
	const router = useRouter();
	return (
		<NavigationMenu className="flex items-center justify-between max-w-full px-2 w-full">
			<NavigationMenuList className="flex items-center">
				<NavigationMenuItem
					className="mr-5"
					onClick={() => router.push("/")}
				>
					<div className="flex items-center gap-2 p-2 cursor-pointer">
						<Avatar className="w-6 h-6">
							<AvatarImage src="/logo.svg" />
						</Avatar>
						<span className="text-xl font-bold font-ox">
							ElectroFusion
						</span>
					</div>
				</NavigationMenuItem>
			</NavigationMenuList>
			<NavbarLinks />
			<NavbarUserSection isLoaded={isLoaded} isSignedIn={isSignedIn} />
		</NavigationMenu>
	);
}

function NavbarLinks() {
	const categories = useQuery(api.categories.getCategoriesWithHierarchy);

	return (
		<NavigationMenu>
			<NavigationMenuList className="flex-1 gap-5">
				<NavigationMenuItem>
					<NavigationMenuLink
						className={navigationMenuTriggerStyle({
							className:
								"bg-transparent border border-border rounded-full",
						})}
						href="/shop"
					>
						Home
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						className={navigationMenuTriggerStyle({
							className:
								"bg-transparent border border-border rounded-full",
						})}
						href="/shop/browse"
					>
						Browse
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={navigationMenuTriggerStyle({
							className:
								"bg-transparent border border-border rounded-full",
						})}
					>
						All Categories
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavbarCategories categories={categories} />
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
