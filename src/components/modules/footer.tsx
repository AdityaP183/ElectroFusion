"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Icons } from "../ui/icons";
import Logo from "./logo";

export default function Footer() {
	return (
		<footer className="bg-black text-white mt-20 border border-border">
			{/* Main footer container */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
					{/* Brand & Socials */}
					<div className="space-y-4">
						<Logo />
						<p className="text-gray-400 text-sm">
							Bringing the future of electronics to your doorstep.
							Premium products with unmatched service.
						</p>
						<div className="flex space-x-4 pt-2">
							{/* Social media icons */}
							<a
								href="https://github.com/AdityaP183/ElectroFusion"
								target="_blank"
								className="text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-110"
							>
								<Icons.gitHub />
							</a>
						</div>
					</div>

					{/* Info Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">
							Information
						</h3>
						<ul className="space-y-2 text-sm">
							{[
								"About Us",
								"Contact",
								"Shipping Policy",
								"Returns",
								"FAQ",
								"Terms & Conditions",
							].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-300"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter & Contact */}
					<div>
						<h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">
							Stay Connected
						</h3>

						{/* Contact Info */}
						<div className="mt-6 space-y-2 text-sm text-gray-400">
							<div className="flex items-center">
								<Mail size={14} className="mr-2" />
								<span>support@electrofusion.com</span>
							</div>
							<div className="flex items-center">
								<Phone size={14} className="mr-2" />
								<span>(+91) 8283955592</span>
							</div>
							<div className="flex items-center">
								<MapPin size={14} className="mr-2" />
								<span>123 Tech Boulevard, Digital City</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
					<p className="text-gray-500 text-sm">
						© {new Date().getFullYear()} ElectroFusion. All rights
						reserved.
					</p>
					<div className="flex space-x-4 mt-4 sm:mt-0 text-sm">
						{["Privacy Policy", "Terms of Service", "Sitemap"].map(
							(item, idx) => (
								<a
									key={idx}
									href="#"
									className="text-gray-500 hover:text-white transition-colors duration-300"
								>
									{item}
								</a>
							)
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}
