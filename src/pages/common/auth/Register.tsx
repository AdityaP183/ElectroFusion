import { LazyLoadingImage } from "@/components/app/common";
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
import { registerSchema } from "@/lib/schema";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

const Register = () => {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		},
		mode: "onChange",
	});

	function onFormSubmit(values: z.infer<typeof registerSchema>) {
		console.log(values);
	}

	console.log(form);
	return (
		<div className="flex items-center justify-center w-full h-screen">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-3/5 h-[75vh]"
			>
				<Card className="flex w-full h-full gap-3 p-3">
					<Card className="relative flex-1 w-full h-auto overflow-hidden">
						<LazyLoadingImage imgUrl="./assets/register-bg.jpg" />
						<div className="absolute flex items-center justify-between top-1 left-1 right-1">
							<div className="flex items-center gap-1 p-1 text-sm rounded-full top-1 left-1 bg-secondary/60 glass font-ox">
								<Avatar shape="circle" className="w-7 h-7">
									<AvatarImage src="./logo.svg" />
								</Avatar>
								<h4>ElectroFusion</h4>
							</div>
							<Link
								to="/"
								className="flex items-center gap-1 p-1 transition-colors rounded-full right-1 bg-secondary/60 hover:bg-secondary/80 top-1"
							>
								Back to site
								<ArrowRight />
							</Link>
						</div>
					</Card>
					<Card className="flex-[0.9] bg-transparent border-none shadow-none w-full">
						<CardHeader className="px-10">
							<CardTitle className="text-4xl">
								Create Account
							</CardTitle>
							<CardDescription className="text-lg">
								Already a user?{" "}
								<Link
									to="/login"
									className="font-semibold underline"
								>
									Login
								</Link>{" "}
								now
							</CardDescription>
						</CardHeader>
						<CardContent className="px-10 mt-10">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(
										onFormSubmit,
										(e) => {
											console.log("error", e);
										}
									)}
									className="grid grid-cols-2 gap-x-6 gap-y-3"
								>
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
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input
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
										name="email"
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
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
										name="password"
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>Password</FormLabel>
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
										className="col-span-2 mt-6 font-extrabold"
										type="submit"
										variant="secondary"
									>
										Register
									</Button>
								</form>
							</Form>
						</CardContent>
						<CardFooter className="grid w-full grid-cols-2 gap-6 px-10">
							<div className="flex items-center w-full col-span-2">
								<div className="flex-1 border-t border-secondary" />
								<span className="px-4 text-gray-500">
									or continue with
								</span>
								<div className="flex-1 border-t border-secondary" />
							</div>
							<Button className="flex items-center w-full gap-3 text-lg font-bold">
								<Avatar className="w-6 h-6">
									<AvatarImage src="./assets/google.svg" />
								</Avatar>
								Google
							</Button>
							<Button className="flex items-center w-full gap-3 text-lg font-bold">
								{/* <Avatar className="w-6 h-6">
									<AvatarImage src="./assets/google.svg" />
								</Avatar> */}
								Guest User
							</Button>
						</CardFooter>
					</Card>
				</Card>
			</motion.div>
		</div>
	);
};

export default Register;
