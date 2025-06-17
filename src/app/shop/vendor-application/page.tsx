"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Shield, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { vendorApplicationFormSchema } from "@/lib/app-schemas";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.2 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", stiffness: 100, damping: 12 },
	},
};

export default function VendorApplication() {
	const router = useRouter();
	const { user, isLoaded, isSignedIn } = useUser();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof vendorApplicationFormSchema>>({
		resolver: zodResolver(vendorApplicationFormSchema),
		defaultValues: { contactPhone: "", contactEmail: "", reason: "" },
	});

	const createApplication = useMutation(
		api.vendorApplication.addVendorApplication
	);

	const onSubmit = async (values: z.infer<typeof vendorApplicationFormSchema>) => {
		if (!user)
			return toast.error("Please sign in to apply for vendor status.");

		if (
			values.contactEmail === "" ||
			values.contactPhone === "" ||
			values.reason === ""
		) {
			toast.error("Please fill out all fields.");
		}

		setIsSubmitting(true);

		try {
			const application = await createApplication({
				clerkId: user.id,
				contactEmail: values.contactEmail,
				contactPhone: values.contactPhone,
				comment: values.reason,
			});

			toast.success("Application submitted!");
			form.reset();

			if (application) {
				router.push(`/shop`);
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to create product");
		} finally {
			setIsSubmitting(false);
		}
	};

	const features = [
		{ icon: Shield, text: "Secure Payments" },
		{ icon: TrendingUp, text: "Analytics Dashboard" },
		{ icon: Users, text: "Customer Support" },
	];

	if (!isLoaded || !isSignedIn) return <div>Loading...</div>;

	return (
		<Card className="w-full bg-transparent border-none max-w-6xl mx-auto py-12">
			<CardHeader className="space-y-3 text-center">
				<Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 mx-auto w-fit">
					<Zap className="w-3 h-3 mr-1" />
					Start Selling Today
				</Badge>
				<CardTitle className="text-3xl font-bold">
					Become a Seller
				</CardTitle>
				<CardDescription className="text-muted-foreground text-lg">
					Join ElectroFusion and reach a nationwide audience. Enjoy
					seamless onboarding, secure payouts, and full sales control.
				</CardDescription>
			</CardHeader>

			<CardContent className="mt-10 space-y-10 px-6 md:px-12">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="flex flex-wrap justify-center gap-4"
				>
					{features.map((feature, i) => (
						<motion.div
							key={i}
							variants={itemVariants}
							className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full text-sm shadow-sm"
						>
							<feature.icon className="w-4 h-4 text-primary" />
							<span className="text-muted-foreground">
								{feature.text}
							</span>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 text-center"
				>
					<h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200">
						Keep 80% of Every Sale
					</h3>
					<p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2 max-w-xl mx-auto">
						As a verified vendor, you’ll receive 80% of the revenue
						from every product sold. Transparent payouts and full
						sales visibility — no hidden charges.
					</p>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="bg-secondary/30 border border-secondary rounded-xl shadow-md p-6 md:p-8"
				>
					<h4 className="text-lg font-medium mb-4 text-center">
						Apply to Become a Seller
					</h4>
					<p>
						After applying, your application will be checked and
						approved by our team. Please be patient.
					</p>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="contactEmail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="you@example.com"
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="contactPhone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact Number</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="+91 98765 43210"
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="reason"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Reason for Applying
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												rows={4}
												placeholder="Tell us why you're interested in becoming a vendor..."
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full md:w-auto"
								disabled={isSubmitting}
							>
								{isSubmitting
									? "Submitting..."
									: "Submit Application"}
							</Button>
						</form>
					</Form>
				</motion.div>
			</CardContent>
		</Card>
	);
}
