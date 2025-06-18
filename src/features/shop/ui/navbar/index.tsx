"use client";

import { useAuth } from "@clerk/nextjs";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Logo from "@/components/modules/logo";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navBrowseLinks } from "@/lib/app-data";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../../../convex/_generated/api";
import NavbarCategories from "./navbar-categories";
import NavbarUserSection from "./navbar-user-section";

export default function Navbar() {
	const { isLoaded, isSignedIn } = useAuth();
	const [visible] = useState(true);

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
					<Logo />
				</NavigationMenuItem>
			</NavigationMenuList>
			{isLoaded && isSignedIn && <NavbarLinks />}
			{isLoaded && !isSignedIn && <NavbarNoAuth />}
			{isLoaded && isSignedIn && (
				<NavbarUserSection
					isLoaded={isLoaded}
					isSignedIn={isSignedIn}
				/>
			)}
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
					<NavigationMenuTrigger
						className={navigationMenuTriggerStyle({
							className:
								"bg-transparent border border-border rounded-full",
						})}
					>
						Browse
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="flex flex-col gap-2 w-[250px] p-4 justify-center">
							{navBrowseLinks.map((link) => {
								const Icon = link.icon;
								return (
									<Link
										key={link.title}
										className="flex items-center gap-2 hover:bg-accent p-2 rounded-md"
										href={`/shop/browse?type=${link.slug}`}
									>
										<Icon className="h-4 w-4" />
										{link.title}
									</Link>
								);
							})}
						</div>
					</NavigationMenuContent>
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

function NavbarNoAuth() {
	return (
		<NavigationMenu>
			<NavigationMenuList className="flex-1 gap-5">
				<NavigationMenuItem>
					<Link href={`/sign-in`} className="cursor-pointer">
						<Button className="bg-secondary/80 border-border border rounded-full text-foreground hover:bg-secondary/30 cursor-pointer">
							Sign In
						</Button>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href={`/sign-in`} className="cursor-pointer">
						<Button className="bg-background border-border border rounded-full text-foreground hover:bg-secondary/30 cursor-pointer">
							Sign Up
						</Button>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
