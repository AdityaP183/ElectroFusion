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
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { forgotPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const ForgotPassword = () => {
	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
		mode: "onChange",
	});

	function onFormSubmit(values: z.infer<typeof forgotPasswordSchema>) {
		console.log(values);
	}

	return (
		<div className="flex items-center justify-center w-full h-[80vh]">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card>
					<CardHeader>
						<CardTitle className="text-4xl">
							Forgot Password
						</CardTitle>
						<CardDescription className="text-lg">
							Enter the email address associated with your account
							and we will send you a link to reset your password.
						</CardDescription>
					</CardHeader>
					<CardContent className="w-3/4 mx-auto">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onFormSubmit, (e) =>
									console.log(e)
								)}
								className="flex items-center gap-2"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="flex-[3] flex items-center gap-3 px-2 py-1 space-y-0 rounded-md bg-secondary/60 glass">
											<Mail className="mx-2" />
											<Separator
												className="h-6 bg-primary/30"
												orientation="vertical"
											/>
											<FormControl>
												<Input
													transparent={true}
													className="px-0 border-none outline-none"
													placeholder="Enter your email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button className="font-extrabold " size="lg">
									Send
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
export default ForgotPassword;
