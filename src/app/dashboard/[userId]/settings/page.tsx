"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileFormSchema } from "@/lib/app-schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function DashboardSettings() {
	const router = useRouter();
	const { user, isLoaded } = useUser();
	const dbUser = useQuery(api.users.getUser, { userId: user?.id || "" });
	const updateUser = useMutation(api.vendor.updateProfile);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
		},
	});

	useEffect(() => {
		if (dbUser) {
			form.reset({
				firstName: dbUser?.firstName || "",
				lastName: dbUser?.lastName || "",
				email: dbUser?.email || "",
			});
		}
	}, [dbUser, form]);

	const { reset } = form;

	async function onSubmit(data: z.infer<typeof profileFormSchema>) {
		setIsSubmitting(true);

		try {
			await updateUser({
				userId: dbUser?._id as Id<"users">,
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
				},
			});

			toast.success("Profile updated successfully!");
			reset();
			router.push(`/dashboard/${user?.id}`);
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to create product");
		} finally {
			setIsSubmitting(false);
		}
	}

	const getRoleBadgeColor = (role: string) => {
		switch (role.toLowerCase()) {
			case "admin":
				return "bg-blue-500/40 border-blue-500 text-white";
			case "vendor":
				return "bg-green-500/40 border-green-500 text-white";
			case "user":
				return "bg-gray-500/40 border-gray-500 text-white";
			default:
				return "bg-gray-500/40 border-gray-500 text-white";
		}
	};

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<div className="w-full h-full overflow-y-auto">
			<div className="px-5 mb-5">
				<h1 className="text-2xl font-bold">Profile Settings</h1>
				<p className="text-muted-foreground">
					Manage your account settings and profile information.
				</p>
			</div>

			<div className="p-5 space-y-6">
				{/* Profile Overview Card */}
				<Card>
					<CardHeader>
						<CardTitle>Profile Overview</CardTitle>
						<CardDescription>
							Your current profile information
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center space-x-4">
							<Avatar className="h-20 w-20">
								<AvatarImage
									src={user.imageUrl}
									alt="Profile picture"
								/>
							</Avatar>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<h3 className="text-lg font-semibold">
										{dbUser?.firstName} {dbUser?.lastName}
									</h3>
									{dbUser?.role && (
										<Badge
											className={getRoleBadgeColor(
												dbUser?.role
											)}
										>
											{dbUser?.role}
										</Badge>
									)}
								</div>
								<p className="text-sm text-muted-foreground">
									{dbUser?.email}
								</p>
								<p className="text-xs text-muted-foreground">
									User ID: {user.id}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Edit Profile Form */}
				<Card>
					<CardHeader>
						<CardTitle>Edit Profile</CardTitle>
						<CardDescription>
							Update your personal information below.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													First Name
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your first name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your last name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your email address"
													type="email"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This email will be used for
												account notifications and login.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex flex-col sm:flex-row gap-3 pt-4">
									<Button
										type="submit"
										className="w-full sm:w-auto"
										disabled={isSubmitting}
									>
										Save Changes
									</Button>
									<Button
										type="button"
										variant="outline"
										className="w-full sm:w-auto"
										onClick={() => form.reset()}
									>
										Reset Changes
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>

				{/* Account Information Card */}
				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
						<CardDescription>
							Read-only account details
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Account Role
								</label>
								<div className="mt-1">
									{dbUser && (
										<Badge
											className={getRoleBadgeColor(
												dbUser?.role
											)}
										>
											{dbUser?.role}
										</Badge>
									)}
								</div>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									User ID
								</label>
								<p className="mt-1 text-sm font-mono bg-muted px-2 py-1 rounded">
									{user.id}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
