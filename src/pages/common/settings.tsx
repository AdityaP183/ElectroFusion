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
import { updateUserSchema } from "@/db/schemas";
import fusionStore from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Settings() {
	const { user } = fusionStore();
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
		console.log(values);
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
