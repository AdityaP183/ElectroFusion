import { ImageUpload } from "@/components/app/common";
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
import { Label } from "@/components/ui/label";
import { updateUser } from "@/db/api-auth";
import { updateUserSchema } from "@/db/schemas";
import { User } from "@/lib/types/user-types";
import fusionStore from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Settings() {
	const { user, setUser } = fusionStore();
	const [file, setFile] = useState<{
		imgFile: File;
		img: string;
		name: string;
	} | null>(null);

	const updateUserForm = useForm<z.infer<typeof updateUserSchema>>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			firstName: user?.user_metadata.firstName || "",
			lastName: user?.user_metadata.lastName || "",
		},
		mode: "onTouched",
	});

	async function onFormSubmit(values: z.infer<typeof updateUserSchema>) {
		const dataToUpdate = { ...values, avatar: file?.imgFile };
		try {
			const response = await updateUser({
				data: dataToUpdate,
			});

			toast.success("Profile updated successfully.");
			if (response.user) {
				const extractedUser: User = {
					id: response.user.id,
					email: response.user.email || "",
					user_metadata: {
						firstName: response.user.user_metadata.firstName || "",
						lastName: response.user.user_metadata.lastName || "",
						role: response.user.user_metadata.role || "",
						avatar: response.user.user_metadata.avatar || "",
					},
				};
				setUser(extractedUser);
			} else {
				window.location.reload();
			}
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			else toast.error("Something went wrong during update.");
		}
	}

	return (
		<Card className="border-none">
			<CardHeader>
				<CardTitle className="text-3xl font-extrabold">
					Settings
				</CardTitle>
				<CardDescription className="text-lg font-medium">
					Update your profile
				</CardDescription>
			</CardHeader>

			<CardContent className="flex justify-center gap-3">
				<ImageUpload file={file} setFile={setFile} />

				<div className="p-3 text-xl w-[350px]">
					<Form {...updateUserForm}>
						<form
							onSubmit={updateUserForm.handleSubmit(
								onFormSubmit,
								(e) => {
									console.log(e);
								}
							)}
							className="flex flex-col gap-4"
						>
							<FormField
								control={updateUserForm.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input
												type="firstName"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateUserForm.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input type="lastName" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									value={user?.email}
									disabled
								/>
							</div>
							<Button
								className="mt-6 font-extrabold"
								type="submit"
								variant="secondary"
							>
								Update
							</Button>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
