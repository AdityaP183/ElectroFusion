import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
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
import { tempUser } from "@/lib/app-data";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

const AdminProfile = () => {
	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			username: tempUser.username,
			email: tempUser.email,
			password: "",
			first_name: tempUser.first_name,
			last_name: tempUser.last_name,
			address: tempUser.address || "",
			phone_number: tempUser.phone_number || "",
			role: tempUser.role,
			avatar: tempUser.avatar || "",
		},
		mode: "onChange",
	});

	const onSubmit = (data: z.infer<typeof profileSchema>) => {
		console.log(JSON.stringify(data, null, 2));
	};

	return (
		<Card className="w-[60%] border-none ml-10 py-0">
			<CardHeader>
				<CardTitle className="text-xl">Profile</CardTitle>
				<CardDescription>
					This is how others will see you on the site.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit, (e) => {
							console.log("error", e);
						})}
						className="flex gap-10"
					>
						<div
							className="relative w-40 h-40 m-3 overflow-hidden bg-red-500 rounded-lg group"
							style={{
								backgroundImage: `url(${
									tempUser.avatar ||
									"https://shorturl.at/vIjhF"
								})`,
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
							}}
						>
							<div className="absolute inset-0 items-center justify-center hidden p-1 transition-all duration-500 ease-in-out rounded-tl-lg group-hover:flex group-hover:bg-black/30 group-hover:cursor-pointer">
								<Pencil />
							</div>
						</div>

						<div className="flex-1 space-y-8">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											This is your public id.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												disabled
												{...field}
												type="email"
												className="cursor-not-allowed"
											/>
										</FormControl>
										<FormDescription>
											This is your email. You cannot
											change it.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled
												className="capitalize cursor-not-allowed"
											/>
										</FormControl>
										<FormDescription>
											This is your role. You cannot change
											it.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input {...field} type="tel" />
										</FormControl>
										<FormDescription>
											Optional
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								disabled={!form.formState.isValid}
							>
								Update Profile
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
export default AdminProfile;
