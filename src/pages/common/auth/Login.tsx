import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import useAuth from "@/context/store/useFetch";
import { login } from "@/db/apiAuth";
import { loginSchema } from "@/lib/schema";
import { fusionStore } from "@/store/store";
import { User } from "@/types/component.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Info, LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginHeroTexts = [
	{
		line1: "Welcome Back",
		line2: "Continue Exploring",
	},
	{
		line1: "Your Next Adventure",
		line2: "Awaits You",
	},
	{
		line1: "Quick & Easy",
		line2: "Access to Top Brands",
	},
];

const Login = () => {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onSubmit",
	});

	const formData = form.getValues();

	const { data, loading, error, fn: loginUser } = useAuth(login, formData);
	const { setUser } = fusionStore();

	function onFormSubmit() {
		loginUser();
		if (!error && data?.user) {
			const extractedUser: User = {
				id: data.user.id,
				email: data.user.email || "",
				firstName: data.user.user_metadata?.firstName,
				lastName: data.user.user_metadata?.lastName,
				role: data.user.user_metadata?.role,
				avatar: data.user.user_metadata?.avatar,
				createdAt: data.user.created_at,
			};
			setUser(extractedUser);
		}
	}

	const [currentIndex, setCurrentIndex] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % loginHeroTexts.length
			);
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (error === null && data) {
			navigate("/home", { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, loading]);

	console.log("Rendering Register...");
	return (
		<div className="flex items-center justify-center w-full my-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-3/5 h-[75vh]"
			>
				<Card className="flex w-full h-full gap-3 p-3">
					<Card className="flex-1 w-full bg-transparent border-none shadow-none">
						<CardHeader className="px-10">
							<CardTitle className="text-4xl">Login</CardTitle>
							<CardDescription className="text-lg">
								Not a user yet?{" "}
								<Link
									to="/register"
									className="font-semibold underline"
								>
									Register
								</Link>{" "}
								now
							</CardDescription>
							{error && (
								<div className="text-lg text-rose-600">
									{error?.message}
								</div>
							)}
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

									<div className="flex items-start">
										<Button
											variant="link"
											onClick={() => {}}
											className="px-0"
											asChild
										>
											<Link to="/forgot-password">
												Forgot Password ?
											</Link>
										</Button>
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
											"Register"
										)}
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
							<Button
								className="flex items-center w-full gap-3 text-lg font-bold"
								onClick={() =>
									toast(
										<div className="flex items-center gap-3 text-sm text-yellow-500">
											<Info />
											Login using Google currently not
											available
										</div>,
										{
											style: { width: "fit-content" },
										}
									)
								}
							>
								<Avatar className="w-6 h-6">
									<AvatarImage src="./assets/google.svg" />
								</Avatar>
								Google
							</Button>
							<Button
								className="flex items-center w-full gap-3 text-lg font-bold"
								onClick={() =>
									toast(
										<div className="flex items-center gap-3 text-sm font-medium text-yellow-500">
											<Info />
											Login using Github currently not
											available
										</div>
									)
								}
							>
								<Avatar className="w-7 h-7">
									<AvatarImage src="./assets/github.svg" />
								</Avatar>
								Github
							</Button>
						</CardFooter>
					</Card>
					<Card className="relative flex-1 w-full h-auto overflow-hidden">
						<div className="absolute top-0 left-0 bottom-0 right-0 items-center px-5 py-24 bg-[radial-gradient(155%_130%_at_50%_0%,_#000_40%,_hsl(var(--primary))_100%)]"></div>
						<div className="absolute flex items-center justify-between top-2 left-2 right-2 z-[1]">
							<div className="flex items-center gap-1 p-1 text-sm rounded-full top-1 left-1 bg-secondary/60 glass font-ox">
								<Avatar shape="circle" className="w-7 h-7">
									<AvatarImage src="./logo.svg" />
								</Avatar>
								<h4>ElectroFusion</h4>
							</div>
							<Link
								to="/"
								className="flex items-center gap-1 px-2 py-1 text-sm transition-colors rounded-full right-1 bg-secondary/60 hover:bg-secondary/80 top-1"
							>
								Back to site
								<ArrowRight className="w-4 h-4" />
							</Link>
						</div>
						<div className="absolute left-0 right-0 text-center bottom-10">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentIndex}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.8 }}
									className="flex flex-col w-full gap-3"
								>
									<div>
										<h1 className="text-5xl font-semibold">
											{loginHeroTexts[currentIndex].line1}
										</h1>
										<h1 className="mt-2 text-3xl font-semibold">
											{loginHeroTexts[currentIndex].line2}
										</h1>
									</div>
								</motion.div>
							</AnimatePresence>

							<div className="flex items-center justify-center gap-3 mt-20">
								{loginHeroTexts.map((_, index) => (
									<div
										key={index}
										className="relative w-10 h-2 overflow-hidden rounded-full bg-primary"
									>
										<motion.div
											key={`${currentIndex}-${index}`}
											initial={{ width: 0 }}
											animate={{
												width:
													index === currentIndex
														? "100%"
														: "100%",
												opacity:
													currentIndex >= index
														? 1
														: 0,
											}}
											transition={{
												duration:
													index === currentIndex
														? 6
														: 0,
												ease: "linear",
											}}
											className="absolute top-0 left-0 h-2 rounded-full bg-primary-foreground"
										/>
									</div>
								))}
							</div>
						</div>
					</Card>
				</Card>
			</motion.div>
		</div>
	);
};

export default Login;
