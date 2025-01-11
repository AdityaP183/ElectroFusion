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
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Settings() {
	const { user } = fusionStore();

	const updateUserForm = useForm<z.infer<typeof updateUserSchema>>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			firstName: user?.user_metadata.firstName || "",
			lastName: user?.user_metadata.lastName || "",
		},
		mode: "onTouched",
	});
	const [file, setFile] = useState<{
		imgFile: File;
		img: string;
		name: string;
	} | null>(null);

	async function onFormSubmit(values: z.infer<typeof updateUserSchema>) {
		console.log(values);
	}

	const loading = false;

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
										<FormLabel className="text-xl">
											First Name
										</FormLabel>
										<FormControl>
											<Input
												type="firstName"
												{...field}
												className="text-lg"
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
										<FormLabel className="text-xl">
											Last Name
										</FormLabel>
										<FormControl>
											<Input
												type="lastName"
												{...field}
												className="text-lg"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								<Label className="text-lg" htmlFor="email">
									Email
								</Label>
								<Input
									id="email"
									value={user?.email}
									disabled
									className="text-lg"
								/>
							</div>
							<Button
								className="mt-6 font-extrabold"
								type="submit"
								variant="secondary"
								disabled={loading}
							>
								{loading ? (
									<LoaderPinwheel className="mr-2 animate-spin" />
								) : (
									"Update"
								)}
							</Button>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
