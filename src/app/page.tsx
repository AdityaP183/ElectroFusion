"use client";

import Navbar from "@/features/shop/ui/navbar";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Check,
	ChevronRight,
	Clock,
	Code,
	Laptop,
	Menu,
	X,
	Zap,
} from "lucide-react";
export default function Page() {
	const headerRef = useRef<HTMLElement>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const scrollToSection = (id: string) => {
		setMobileMenuOpen(false);
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const fadeInUp = {
		hidden: { opacity: 0, y: 60 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};
	return (
		<div className="flex min-h-[100dvh] flex-col">
			{/* Header */}
			<header
				ref={headerRef}
				className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
			>
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<Zap className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">StreamLine</span>
					</div>
					<nav className="hidden md:flex gap-6">
						<button
							onClick={() => scrollToSection("features")}
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Features
						</button>
						<button
							onClick={() => scrollToSection("testimonials")}
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Testimonials
						</button>
						<button
							onClick={() => scrollToSection("pricing")}
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Pricing
						</button>
						<Link
							href="#"
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Blog
						</Link>
					</nav>
					<div className="flex items-center gap-4">
						<Link
							href="#"
							className="text-sm font-medium hover:underline underline-offset-4 hidden sm:inline-block"
						>
							Sign In
						</Link>
						<Button asChild>
							<Link href="#" className="hidden sm:inline-flex">
								Get Started
							</Link>
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<span className="sr-only">Toggle menu</span>
							{mobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileMenuOpen && (
					<motion.div
						className="md:hidden"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<div className="container py-4 flex flex-col gap-4 border-t">
							<button
								onClick={() => scrollToSection("features")}
								className="text-sm font-medium py-2"
							>
								Features
							</button>
							<button
								onClick={() => scrollToSection("testimonials")}
								className="text-sm font-medium py-2"
							>
								Testimonials
							</button>
							<button
								onClick={() => scrollToSection("pricing")}
								className="text-sm font-medium py-2"
							>
								Pricing
							</button>
							<Link href="#" className="text-sm font-medium py-2">
								Blog
							</Link>
							<Button className="w-full mt-2">Get Started</Button>
						</div>
					</motion.div>
				)}
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<motion.div
								className="flex flex-col justify-center space-y-4"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: "-100px" }}
								variants={fadeInUp}
							>
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
										Streamline Your Workflow, Amplify Your
										Productivity
									</h1>
									<p className="max-w-[600px] text-muted-foreground md:text-xl">
										The all-in-one platform that helps teams
										collaborate, manage projects, and
										deliver results faster than ever before.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Button asChild size="lg">
										<Link href="#">
											Get Started{" "}
											<ChevronRight className="ml-1 h-4 w-4" />
										</Link>
									</Button>
									<Button variant="outline" size="lg">
										View Demo
									</Button>
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 100 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.8,
									ease: [0.22, 1, 0.36, 1],
								}}
								viewport={{ once: true, margin: "-100px" }}
							>
								<Image
									src="/placeholder.svg?height=550&width=550"
									width={550}
									height={550}
									alt="Hero Image"
									className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
								/>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section
					id="features"
					className="w-full py-12 md:py-24 lg:py-32 bg-muted overflow-hidden"
				>
					<div className="container px-4 md:px-6">
						<motion.div
							className="flex flex-col items-center justify-center space-y-4 text-center"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
									Features
								</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Everything you need to boost productivity
								</h2>
								<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
									StreamLine combines powerful features with
									an intuitive interface to help your team
									work smarter, not harder.
								</p>
							</div>
						</motion.div>
						<motion.div
							className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
							variants={staggerContainer}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardHeader>
										<Clock className="h-10 w-10 text-primary mb-2" />
										<CardTitle>Time Tracking</CardTitle>
										<CardDescription>
											Effortlessly track time spent on
											tasks and projects to improve
											productivity and billing accuracy.
										</CardDescription>
									</CardHeader>
								</Card>
							</motion.div>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardHeader>
										<Laptop className="h-10 w-10 text-primary mb-2" />
										<CardTitle>
											Project Management
										</CardTitle>
										<CardDescription>
											Organize tasks, set deadlines, and
											monitor progress with our intuitive
											project management tools.
										</CardDescription>
									</CardHeader>
								</Card>
							</motion.div>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardHeader>
										<Code className="h-10 w-10 text-primary mb-2" />
										<CardTitle>
											Workflow Automation
										</CardTitle>
										<CardDescription>
											Automate repetitive tasks and
											workflows to save time and reduce
											human error.
										</CardDescription>
									</CardHeader>
								</Card>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section
					id="testimonials"
					className="w-full py-12 md:py-24 lg:py-32 overflow-hidden"
				>
					<div className="container px-4 md:px-6">
						<motion.div
							className="flex flex-col items-center justify-center space-y-4 text-center"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
									Testimonials
								</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Trusted by thousands of teams
								</h2>
								<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
									Don't just take our word for it. Here's what
									our customers have to say about StreamLine.
								</p>
							</div>
						</motion.div>
						<motion.div
							className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
							variants={staggerContainer}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardContent className="pt-6">
										<div className="flex items-start gap-4">
											<Image
												src="/placeholder.svg?height=40&width=40"
												width={40}
												height={40}
												alt="User Avatar"
												className="rounded-full"
											/>
											<div>
												<p className="text-sm font-medium">
													Sarah Johnson
												</p>
												<p className="text-sm text-muted-foreground">
													Product Manager, TechCorp
												</p>
											</div>
										</div>
										<blockquote className="mt-4 border-l-2 pl-4 italic">
											"StreamLine has transformed how our
											team works. We've cut meeting time
											by 50% and increased delivery speed
											by 35%."
										</blockquote>
									</CardContent>
								</Card>
							</motion.div>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardContent className="pt-6">
										<div className="flex items-start gap-4">
											<Image
												src="/placeholder.svg?height=40&width=40"
												width={40}
												height={40}
												alt="User Avatar"
												className="rounded-full"
											/>
											<div>
												<p className="text-sm font-medium">
													Michael Chen
												</p>
												<p className="text-sm text-muted-foreground">
													CTO, StartupX
												</p>
											</div>
										</div>
										<blockquote className="mt-4 border-l-2 pl-4 italic">
											"The automation features alone have
											saved us countless hours. Our team
											can now focus on what truly
											matters."
										</blockquote>
									</CardContent>
								</Card>
							</motion.div>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardContent className="pt-6">
										<div className="flex items-start gap-4">
											<Image
												src="/placeholder.svg?height=40&width=40"
												width={40}
												height={40}
												alt="User Avatar"
												className="rounded-full"
											/>
											<div>
												<p className="text-sm font-medium">
													Emily Rodriguez
												</p>
												<p className="text-sm text-muted-foreground">
													Marketing Director,
													GrowthLabs
												</p>
											</div>
										</div>
										<blockquote className="mt-4 border-l-2 pl-4 italic">
											"StreamLine has been a game-changer
											for our marketing team. We've
											improved campaign coordination and
											reporting significantly."
										</blockquote>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Pricing Section */}
				<section
					id="pricing"
					className="w-full py-12 md:py-24 lg:py-32 bg-muted overflow-hidden"
				>
					<div className="container px-4 md:px-6">
						<motion.div
							className="flex flex-col items-center justify-center space-y-4 text-center"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
									Pricing
								</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Simple, transparent pricing
								</h2>
								<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
									Choose the plan that's right for your team.
									All plans include a 14-day free trial.
								</p>
							</div>
						</motion.div>
						<motion.div
							className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3"
							variants={staggerContainer}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardHeader>
										<CardTitle>Starter</CardTitle>
										<div className="text-3xl font-bold">
											$12
										</div>
										<CardDescription>
											per user / month
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ul className="grid gap-2">
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Basic time tracking</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>5 projects</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Basic reporting</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Email support</span>
											</li>
										</ul>
									</CardContent>
									<CardFooter>
										<Button className="w-full">
											Get Started
										</Button>
									</CardFooter>
								</Card>
							</motion.div>
							<motion.div
								variants={fadeInUp}
								custom={1}
								initial={{ opacity: 0, y: 60 }}
								whileInView={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.6,
										ease: [0.22, 1, 0.36, 1],
										delay: 0.1,
									},
								}}
								viewport={{ once: true, margin: "-100px" }}
							>
								<Card className="border-primary h-full transition-all duration-300 hover:shadow-lg">
									<CardHeader>
										<div className="text-center text-sm font-medium text-primary mb-2">
											Most Popular
										</div>
										<CardTitle>Professional</CardTitle>
										<div className="text-3xl font-bold">
											$29
										</div>
										<CardDescription>
											per user / month
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ul className="grid gap-2">
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>
													Advanced time tracking
												</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Unlimited projects</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Advanced reporting</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Priority support</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Workflow automation</span>
											</li>
										</ul>
									</CardContent>
									<CardFooter>
										<Button className="w-full">
											Get Started
										</Button>
									</CardFooter>
								</Card>
							</motion.div>
							<motion.div variants={fadeInUp}>
								<Card className="h-full transition-all duration-300 hover:shadow-lg">
									<CardHeader>
										<CardTitle>Enterprise</CardTitle>
										<div className="text-3xl font-bold">
											$49
										</div>
										<CardDescription>
											per user / month
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ul className="grid gap-2">
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>
													Everything in Professional
												</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>Custom integrations</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>
													Dedicated account manager
												</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>24/7 phone support</span>
											</li>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-primary" />
												<span>
													Advanced security features
												</span>
											</li>
										</ul>
									</CardContent>
									<CardFooter>
										<Button className="w-full">
											Contact Sales
										</Button>
									</CardFooter>
								</Card>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
					<div className="container px-4 md:px-6">
						<motion.div
							className="flex flex-col items-center justify-center space-y-4 text-center"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Ready to streamline your workflow?
								</h2>
								<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
									Join thousands of teams that have already
									transformed how they work with StreamLine.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button asChild size="lg">
									<Link href="#">
										Start Your Free Trial{" "}
										<ChevronRight className="ml-1 h-4 w-4" />
									</Link>
								</Button>
								<Button variant="outline" size="lg">
									Schedule a Demo
								</Button>
							</div>
							<p className="text-sm text-muted-foreground">
								No credit card required. 14-day free trial.
							</p>
						</motion.div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="w-full border-t py-6 md:py-0">
				<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
					<div className="flex items-center gap-2">
						<Zap className="h-6 w-6 text-primary" />
						<span className="text-lg font-bold">StreamLine</span>
					</div>
					<div className="flex gap-4">
						<Link
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Terms
						</Link>
						<Link
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Cookies
						</Link>
					</div>
					<div className="flex gap-4">
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
							</svg>
							<span className="sr-only">Twitter</span>
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
							</svg>
							<span className="sr-only">Facebook</span>
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<rect
									width="20"
									height="20"
									x="2"
									y="2"
									rx="5"
									ry="5"
								/>
								<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
								<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
							</svg>
							<span className="sr-only">Instagram</span>
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect width="4" height="12" x="2" y="9" />
								<circle cx="4" cy="4" r="2" />
							</svg>
							<span className="sr-only">LinkedIn</span>
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
