import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
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
import { Pencil } from "lucide-react";

const Profile = () => {
	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			email: tempUser.email,
			password: "",
			first_name: tempUser.first_name,
			last_name: tempUser.last_name,
			address: tempUser.address?.address || "",
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
		<Card className="py-0 ml-10">
			<CardHeader>
				<CardTitle className="text-xl">Profile</CardTitle>
				<CardDescription>
					This is how others will see you on the site.
				</CardDescription>
			</CardHeader>
			<CardContent className="w-[60%] mx-auto">
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
								className="font-bold"
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
export default Profile;
