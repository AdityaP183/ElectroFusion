import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import fusionStore from "@/stores/userStore";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
	{
		id: "shop",
		title: "Shop",
		links: [
			{
				label: "Home",
				link: "/store",
			},
			{
				label: "Search",
				link: "/store/search",
			},
			{
				label: "About Us",
				link: "/store/about-us",
			},
			{
				label: "Contact Us",
				link: "/store/contact-us",
			},
		],
	},
	{
		id: "customer",
		title: "Customer",
		links: [
			{
				label: "Track Order",
				link: "/",
			},
			{
				label: "Returns & Refunds",
				link: "/",
			},
			{
				label: "Terms and Conditions",
				link: "/",
			},
		],
	},
	{
		id: "vendor",
		title: "Vendor",
		links: [
			{
				label: "Become a vendor",
				link: "/",
			},
			{
				label: "Dashboard",
				link: "/vendor/dashboard",
			},
		],
	},
];

export default function Footer() {
	const { user } = fusionStore();
	return (
		<footer className="flex flex-col gap-5">
			<div className="flex justify-between">
				<div>
					<div className="flex items-center gap-2 p-2">
						<Avatar shape="square" className="w-10 h-10">
							<AvatarImage src="/logo.svg" />
						</Avatar>
						<span className="text-4xl font-bold font-ox">
							ElectroFusion
						</span>
					</div>
					<p className="mt-3 text-lg">
						Powering your world with the{" "}
						<strong>Best in Electronics</strong> –
						<i>Shop the Right Way.</i>
					</p>
				</div>
				<div className="grid grid-cols-3 gap-4">
					{footerLinks.map((linkItem) => {
                        if(linkItem.title === "shop" )
						return (
							<div
								key={linkItem.id}
								className="flex flex-col items-start gap-5"
							>
								<h4 className="text-lg font-semibold">
									{linkItem.title}
								</h4>
								{linkItem.links.map((linkItem_link) => (
									<Button
										key={linkItem_link.label}
										asChild
										variant="link"
										className="px-0 text-muted-foreground hover:text-primary"
									>
										<Link to={linkItem_link.link}>
											{linkItem_link.label}
										</Link>
									</Button>
								))}
							</div>
						);
					})}
				</div>
			</div>
			<Separator />
			<div className="flex items-center justify-between px-5">
				<p className="text-sm text-center text-muted-foreground">
					&copy; {new Date().getFullYear()} ElectroFusion. All rights
					reserved.
				</p>

				<div>
					<Button
						size="icon"
						className="rounded-full"
						variant="secondary"
						onClick={() =>
							window.open(
								"https://github.com/AdityaP183/ElectroFusion.git",
								"_blank"
							)
						}
					>
						<Github />
					</Button>
				</div>
			</div>
		</footer>
	);
}
