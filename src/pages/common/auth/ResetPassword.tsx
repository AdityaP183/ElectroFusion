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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const ResetPassword = () => {
	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	function onFormSubmit(values: z.infer<typeof resetPasswordSchema>) {
		console.log(values);
	}

	console.log("Rendering Register...");
	return (
		<div className="flex items-center justify-center w-full h-screen">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-[40%]"
			>
				<Card className="flex-1 w-full ">
					<CardHeader className="px-10">
						<CardTitle className="text-4xl">
							Reset Password
						</CardTitle>
						<CardDescription className="text-lg">
							Enter your new password and confirm it
						</CardDescription>
					</CardHeader>
					<CardContent className="px-10 mt-10">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(
									onFormSubmit,
									(e) => {
										console.log(e);
									}
								)}
								className="flex flex-col gap-4"
							>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													className="border-primary/50"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel>
												Confirm Password
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													className="border-primary/50"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									className="w-1/3 mx-auto mt-6 font-extrabold"
									type="submit"
								>
									Reset Password
								</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter className="flex items-center justify-center">
						<Link
							to="/login"
							className="flex items-center gap-1 px-2 py-1 text-sm transition-colors rounded-full bg-secondary/60 hover:bg-secondary/80"
						>
							Back to login
							<ArrowRight className="w-4 h-4" />
						</Link>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};

export default ResetPassword;
