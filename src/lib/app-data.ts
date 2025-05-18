import { Award, Flame, TrendingUp } from "lucide-react";

export const signInHeroTexts = [
	{
		title: "Welcome Back",
		subtitle: "Your Tech Journey Continues",
	},
	{
		title: "Explore Smarter",
		subtitle: "With Every Login",
	},
	{
		title: "Access the Latest",
		subtitle: "Top Brands in One Click",
	},
];

export const signUpHeroTexts = [
	{
		title: "Start Your Smart Life",
		subtitle: "With Curated Tech Picks",
	},
	{
		title: "Join the Future",
		subtitle: "Of Electronics Shopping",
	},
	{
		title: "Your Gateway to Innovation",
		subtitle: "Begins Here",
	},
];

export const navbarLinks: {
	title: string;
	href: string;
	description: string;
}[] = [
	{
		title: "Alert Dialog",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/docs/primitives/hover-card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/docs/primitives/progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

export const navBrowseLinks = [
	{
		title: "Latest Collections",
		slug: "latest-collections",
		icon: Flame,
	},
	{
		title: "Trending",
		slug: "trending",
		icon: TrendingUp,
	},
	{
		title: "Best Sellers",
		slug: "best-sellers",
		icon: Award,
	},
];
