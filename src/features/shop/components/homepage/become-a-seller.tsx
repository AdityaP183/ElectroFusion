"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    DollarSign,
    Shield,
    Star,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 12,
		},
	},
};

export default function BecomeASeller() {
	return (
		<div className="w-full rounded-xl bg-gradient-to-br from-primary/10 via-secondary/50 to-primary/5 backdrop-blur-3xl border border-border/50 overflow-hidden relative group">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="relative z-10 h-full flex items-center justify-between p-8 md:p-12"
			>
				{/* Left Content */}
				<div className="flex-1 space-y-6">
					<motion.div variants={itemVariants} className="space-y-4">
						<Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
							<Zap className="w-3 h-3 mr-1" />
							Start Selling Today
						</Badge>

						<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
							<span className="text-foreground">Become a</span>{" "}
							<span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
								Seller
							</span>
						</h2>

						<p className="text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed">
							Join thousands of successful sellers and start your
							journey to financial freedom
						</p>
					</motion.div>

					{/* Stats */}
					<motion.div
						variants={itemVariants}
						className="flex gap-6 md:gap-8"
					>
						<div className="text-center">
							<div className="flex items-center justify-center gap-1 text-lg md:text-xl font-bold text-primary">
								<Users className="w-5 h-5" />
								50K+
							</div>
							<p className="text-xs md:text-sm text-muted-foreground">
								Active Sellers
							</p>
						</div>

						<div className="text-center">
							<div className="flex items-center justify-center gap-1 text-lg md:text-xl font-bold text-green-600">
								<DollarSign className="w-5 h-5" />
								₹2L+
							</div>
							<p className="text-xs md:text-sm text-muted-foreground">
								Avg. Monthly
							</p>
						</div>

						<div className="text-center">
							<div className="flex items-center justify-center gap-1 text-lg md:text-xl font-bold text-orange-500">
								<Star className="w-5 h-5 fill-current" />
								4.8
							</div>
							<p className="text-xs md:text-sm text-muted-foreground">
								Seller Rating
							</p>
						</div>
					</motion.div>

					{/* Features */}
					<motion.div
						variants={itemVariants}
						className="flex flex-wrap gap-3"
					>
						{[
							{ icon: Shield, text: "Secure Payments" },
							{ icon: TrendingUp, text: "Analytics Dashboard" },
							{ icon: Users, text: "Customer Support" },
						].map((feature, index) => (
							<div
								key={index}
								className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-full border border-border/50 text-sm"
							>
								<feature.icon className="w-4 h-4 text-primary" />
								<span className="text-muted-foreground">
									{feature.text}
								</span>
							</div>
						))}
					</motion.div>

					{/* CTA Buttons */}
					<motion.div
						variants={itemVariants}
						className="flex gap-4 pt-2"
					>
						<Button
							size="lg"
							className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-full group transition-all duration-300 hover:scale-105 hover:shadow-lg"
						>
							<Link
								href="/shop/vendor-application"
								className="flex items-center"
							>
								Start Selling
								<ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>

						<Button
							variant="outline"
							size="lg"
							className="px-8 py-6 rounded-full border-2 hover:bg-background/80 transition-all duration-300 hover:scale-105"
						>
							Learn More
						</Button>
					</motion.div>
				</div>

				{/* Right Side */}
				<div className="flex-1 flex items-center justify-center relative">
					<Image
						src="/assets/seller.svg"
						alt="Become a Seller"
						width={500}
						height={500}
					/>
				</div>
			</motion.div>
		</div>
	);
}
