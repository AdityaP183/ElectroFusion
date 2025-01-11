import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/db/schemas";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cog, LoaderPinwheel } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import AuthSliderCard from "./auth-slider-card";
import { loginHeroTexts } from "@/lib/app-data";
import toast from "react-hot-toast";
import { loginUser } from "@/db/api-auth";
import useFetch from "@/hooks/use-fetch";
import fusionStore from "@/stores/userStore";
import { User } from "@/lib/types/user-types";

export default function Login() {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onTouched",
	});
	const formData = loginForm.getValues();
	const { data, loading, error, fn } = useFetch(loginUser, formData);
	const { setUser, user } = fusionStore();

	const onFormSubmit = async () => {
		await fn();

		if (error) {
			toast.error(error.message);
			return; // Exit early on error
		}

		if (!loading) {
			toast.success("Login successful");

			if (data) {
				const userToSet: User = {
					id: data?.id,
					email: data?.email || "",
					user_metadata: {
						firstName: data?.user_metadata.firstName,
						lastName: data?.user_metadata.lastName,
						avatar: data.user_metadata.avatar || "",
						role: data.user_metadata.role,
					},
				};
                console.log("setting user", userToSet);
				setUser(userToSet);
			}
		}
	};

	useEffect(() => {
    
        if (user) {
            if (user?.user_metadata.role === "admin") {
                navigate("/admin", { replace: true });
                return;
            }
    
            if (user?.user_metadata.role === "vendor") {
                navigate("/vendor", { replace: true });
                return;
            }
    
            navigate("/", { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % loginHeroTexts.length
			);
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center justify-center w-full my-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
				className="w-[70%]"
			>
				<Card className="flex w-full h-full gap-3 p-3">
					<Card className="flex-1 w-full bg-transparent border-none shadow-none">
						<CardHeader className="px-10">
							<CardTitle className="text-4xl">Login</CardTitle>
							<CardDescription className="text-lg">
								Not a user yet?{" "}
								<Link
									to="/register"
									className="font-semibold underline hover:text-foreground/70"
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
							<Form {...loginForm}>
								<form
									onSubmit={loginForm.handleSubmit(
										onFormSubmit,
										(e) => {
											console.log(e);
										}
									)}
									className="flex flex-col gap-4"
								>
									<FormField
										control={loginForm.control}
										name="email"
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={loginForm.control}
										name="password"
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														type="password"
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
											// onClick={() => {}}
											className="px-0 text-muted-foreground hover:text-foreground"
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
											"Login"
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
								className="flex items-center gap-2 text-base"
								variant={"secondary"}
								onClick={() =>
									toast(() => (
										<div className="flex items-center gap-3 text-yellow-500">
											<Cog className="animate-spin" />
											Feature coming soon
										</div>
									))
								}
							>
								<Avatar className="size-6">
									<AvatarImage src="/assets/google.svg" />
									<AvatarFallback className="text-base">
										G
									</AvatarFallback>
								</Avatar>
								Google
							</Button>
							<Button
								className="flex items-center gap-2 text-base"
								variant={"secondary"}
								onClick={() =>
									toast(() => (
										<div className="flex items-center gap-3 text-yellow-500">
											<Cog className="animate-spin" />
											Feature coming soon
										</div>
									))
								}
							>
								<Avatar className="size-7">
									<AvatarImage
										src="/assets/github.svg"
										className="fill-white"
									/>
									<AvatarFallback>G</AvatarFallback>
								</Avatar>
								Github
							</Button>
						</CardFooter>
					</Card>
					<AuthSliderCard
						currentIndex={currentIndex}
						textData={loginHeroTexts}
					/>
				</Card>
			</motion.div>
		</div>
	);
}
