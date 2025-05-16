"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHeroCard from "@/features/auth/components/auth-hero-card";
import { signInHeroTexts } from "@/lib/app-data";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function Page() {
	return (
		<section className="flex items-center justify-center min-h-screen">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
				className="w-[75%] bg-card rounded-xl overflow-hidden"
			>
				<Card className="flex-row *:flex-1 p-8 justify-center">
					<SignIn.Root>
						<Clerk.Loading>
							{(isGlobalLoading) => (
								<>
									<Start isGlobalLoading={isGlobalLoading} />
									<Verification
										isGlobalLoading={isGlobalLoading}
									/>
									<ForgotPassword
										isGlobalLoading={isGlobalLoading}
									/>
									<ResetPassword
										isGlobalLoading={isGlobalLoading}
									/>
								</>
							)}
						</Clerk.Loading>
					</SignIn.Root>
					<AuthHeroCard texts={signInHeroTexts} />
				</Card>
			</motion.div>
		</section>
	);
}

function Start({ isGlobalLoading }: { isGlobalLoading: boolean }) {
	return (
		<SignIn.Step name="start">
			<Card className="w-full border-none shadow-none h-[600px] justify-center">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Welcome Back!
					</CardTitle>
					<CardDescription>
						Please sign in to continue
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-y-4">
					<div className="grid grid-cols-2 gap-x-4">
						<Clerk.Connection name="google" asChild>
							<Button
								size="sm"
								variant="outline"
								type="button"
								disabled={isGlobalLoading}
								className="cursor-pointer"
							>
								<Clerk.Loading scope="provider:google">
									{(isLoading) =>
										isLoading ? (
											<Icons.spinner className="size-4 animate-spin" />
										) : (
											<>
												<Icons.google className="mr-2 size-4" />
												Google
											</>
										)
									}
								</Clerk.Loading>
							</Button>
						</Clerk.Connection>
						<Clerk.Connection name="apple" asChild>
							<Button
								size="sm"
								variant="outline"
								type="button"
								disabled={isGlobalLoading}
								className="cursor-pointer"
							>
								<Clerk.Loading scope="provider:apple">
									{(isLoading) =>
										isLoading ? (
											<Icons.spinner className="size-4 animate-spin" />
										) : (
											<>
												<Icons.apple className="mr-2 size-4" />
												Apple
											</>
										)
									}
								</Clerk.Loading>
							</Button>
						</Clerk.Connection>
					</div>
					<p className="flex items-center text-sm gap-x-3 text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
						or
					</p>
					<Clerk.Field name="identifier" className="space-y-2">
						<Clerk.Label asChild>
							<Label>Email address</Label>
						</Clerk.Label>
						<Clerk.Input type="email" required asChild>
							<Input />
						</Clerk.Input>
						<Clerk.FieldError className="block text-sm text-destructive" />
					</Clerk.Field>
				</CardContent>
				<CardFooter>
					<div className="grid w-full gap-y-4">
						<SignIn.Action submit asChild>
							<Button disabled={isGlobalLoading}>
								<Clerk.Loading>
									{(isLoading) => {
										return isLoading ? (
											<Icons.spinner className="size-4 animate-spin" />
										) : (
											"Continue"
										);
									}}
								</Clerk.Loading>
							</Button>
						</SignIn.Action>

						<Button variant="link" size="sm" asChild>
							<Clerk.Link navigate="sign-up">
								Don&apos;t have an account? Sign up
							</Clerk.Link>
						</Button>
					</div>
				</CardFooter>
			</Card>
		</SignIn.Step>
	);
}

function Verification({ isGlobalLoading }: { isGlobalLoading: boolean }) {
	return (
		<SignIn.Step name="verifications">
			<SignIn.Strategy name="password">
				<Card className="w-full border-none shadow-none h-[600px] justify-center">
					<CardHeader>
						<CardTitle>Enter Password</CardTitle>
						<CardDescription>
							Welcome back <SignIn.SafeIdentifier />
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-y-4">
						<Clerk.Field name="password" className="space-y-2">
							<Clerk.Label asChild>
								<Label>Password</Label>
							</Clerk.Label>
							<Clerk.Input type="password" asChild>
								<Input />
							</Clerk.Input>
							<Clerk.FieldError className="block text-sm text-destructive" />
						</Clerk.Field>
					</CardContent>
					<CardFooter>
						<div className="grid w-full gap-y-4">
							<SignIn.Action submit asChild>
								<Button disabled={isGlobalLoading}>
									<Clerk.Loading>
										{(isLoading) => {
											return isLoading ? (
												<Icons.spinner className="size-4 animate-spin" />
											) : (
												"Continue"
											);
										}}
									</Clerk.Loading>
								</Button>
							</SignIn.Action>
							<SignIn.Action navigate="forgot-password" asChild>
								<Button type="button" size="sm" variant="link">
									forgot password?
								</Button>
							</SignIn.Action>
						</div>
					</CardFooter>
				</Card>
			</SignIn.Strategy>
		</SignIn.Step>
	);
}

function ForgotPassword({ isGlobalLoading }: { isGlobalLoading: boolean }) {
	return (
		<SignIn.Step name="forgot-password">
			<Card className="w-full border-none shadow-none h-[600px] justify-center">
				<CardHeader>
					<CardTitle>Forgot Password</CardTitle>
					<CardDescription>
						You can reset your password here via email
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-y-4">
					<SignIn.SupportedStrategy
						name="reset_password_email_code"
						asChild
					>
						<Button type="button">
							Reset your password via Email
						</Button>
					</SignIn.SupportedStrategy>
				</CardContent>
				<CardFooter>
					<SignIn.Action navigate="forgot-password" asChild>
						<Button type="button" variant="secondary">
							<ArrowLeft className="mr-2 size-4" />
							Go back
						</Button>
					</SignIn.Action>
				</CardFooter>
			</Card>
		</SignIn.Step>
	);
}

// function ResetPasswordEmailVerification({isGlobalLoading}: {isGlobalLoading: boolean}) {
//     return <SignIn.Step name="email-code-verification">
//         <Card className="w-full border-none shadow-none h-[600px] justify-center"></Card>
//     </SignIn.Step>
// }

function ResetPassword({ isGlobalLoading }: { isGlobalLoading: boolean }) {
	return (
		<SignIn.Step name="reset-password">
			<SignIn.Strategy name="reset_password_email_code">
				<Card className="w-full border-none shadow-none h-[600px] justify-center">
					<CardHeader>
						<CardTitle>Reset Password</CardTitle>
						<CardDescription>
							Enter your new password and then confirm it.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-y-4">
						<Clerk.Field name="password">
							<Clerk.Label>New password</Clerk.Label>
							<Clerk.Input />
							<Clerk.FieldError />
						</Clerk.Field>
						<Clerk.Field name="confirmPassword">
							<Clerk.Label>Confirm password</Clerk.Label>
							<Clerk.Input />
							<Clerk.FieldError />
						</Clerk.Field>
					</CardContent>
					<CardFooter>
						<div className="grid w-full gap-y-4">
							<SignIn.Action submit asChild>
								<Button disabled={isGlobalLoading}>
									<Clerk.Loading>
										{(isLoading) => {
											return isLoading ? (
												<Icons.spinner className="size-4 animate-spin" />
											) : (
												"Update Password"
											);
										}}
									</Clerk.Loading>
								</Button>
							</SignIn.Action>
						</div>
					</CardFooter>
				</Card>
			</SignIn.Strategy>
		</SignIn.Step>
	);
}
