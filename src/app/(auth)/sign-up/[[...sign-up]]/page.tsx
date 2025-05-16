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
import { signUpHeroTexts } from "@/lib/app-data";
import { cn } from "@/lib/utils";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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
					<SignUp.Root>
						<Clerk.Loading>
							{(isGlobalLoading) => (
								<>
									<Start isGlobalLoading={isGlobalLoading} />
									<VerifyEmail
										isGlobalLoading={isGlobalLoading}
									/>
								</>
							)}
						</Clerk.Loading>
					</SignUp.Root>
					<AuthHeroCard texts={signUpHeroTexts}/>
				</Card>
			</motion.div>
		</section>
	);
}

function Start({ isGlobalLoading }: { isGlobalLoading: boolean }) {
	return (
		<SignUp.Step name="start">
			<Card className="w-full border-none shadow-none">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Create your account
					</CardTitle>
					<CardDescription>
						Welcome! Please fill in the details to get started.
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
					<Clerk.Field name="firstName" className="space-y-2">
						<Clerk.Label asChild>
							<Label>First Name</Label>
						</Clerk.Label>
						<Clerk.Input type="text" required asChild>
							<Input />
						</Clerk.Input>
						<Clerk.FieldError className="block text-sm text-destructive" />
					</Clerk.Field>
					<Clerk.Field name="lastName" className="space-y-2">
						<Clerk.Label asChild>
							<Label>Last Name</Label>
						</Clerk.Label>
						<Clerk.Input type="text" required asChild>
							<Input />
						</Clerk.Input>
						<Clerk.FieldError className="block text-sm text-destructive" />
					</Clerk.Field>
					<Clerk.Field name="emailAddress" className="space-y-2">
						<Clerk.Label asChild>
							<Label>Email address</Label>
						</Clerk.Label>
						<Clerk.Input type="email" required asChild>
							<Input />
						</Clerk.Input>
						<Clerk.FieldError className="block text-sm text-destructive" />
					</Clerk.Field>
					<Clerk.Field name="password" className="space-y-2">
						<Clerk.Label asChild>
							<Label>Password</Label>
						</Clerk.Label>
						<Clerk.Input type="password" required asChild>
							<Input />
						</Clerk.Input>
						<Clerk.FieldError className="block text-sm text-destructive" />
					</Clerk.Field>
				</CardContent>
				<CardFooter>
					<div className="grid w-full gap-y-4">
						<SignUp.Captcha className="empty:hidden" />
						<SignUp.Action submit asChild>
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
						</SignUp.Action>
						<Button variant="link" size="sm" asChild>
							<Clerk.Link navigate="sign-in">
								Already have an account? Sign in
							</Clerk.Link>
						</Button>
					</div>
				</CardFooter>
			</Card>
		</SignUp.Step>
	);
}

function VerifyEmail({ isGlobalLoading }: { isGlobalLoading: boolean }) {
	return (
		<SignUp.Step name="verifications">
			<SignUp.Strategy name="email_code">
				<Card className="w-full border-none shadow-none h-[600px] justify-center">
					<CardHeader>
						<CardTitle className="text-2xl font-bold">
							Verify your email
						</CardTitle>
						<CardDescription>
							Use the verification link sent to your email address
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-y-4">
						<div className="grid items-center justify-center gap-y-2">
							<Clerk.Field name="code" className="space-y-2">
								<Clerk.Label className="sr-only">
									Email address
								</Clerk.Label>
								<div className="flex justify-center text-center">
									<Clerk.Input
										type="otp"
										className="flex justify-center has-[:disabled]:opacity-50"
										autoSubmit
										render={({ value, status }) => {
											return (
												<div
													data-status={status}
													className={cn(
														"relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
														{
															"z-10 ring-2 ring-ring ring-offset-background":
																status ===
																	"cursor" ||
																status ===
																	"selected",
														}
													)}
												>
													{value}
													{status === "cursor" && (
														<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
															<div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
														</div>
													)}
												</div>
											);
										}}
									/>
								</div>
								<Clerk.FieldError className="block text-center text-sm text-destructive" />
							</Clerk.Field>
							<SignUp.Action
								asChild
								resend
								className="text-muted-foreground"
								fallback={({ resendableAfter }) => (
									<Button variant="link" size="sm" disabled>
										Didn&apos;t receive a code? Resend (
										<span className="tabular-nums">
											{resendableAfter}
										</span>
										)
									</Button>
								)}
							>
								<Button type="button" variant="link" size="sm">
									Didn&apos;t receive a code? Resend
								</Button>
							</SignUp.Action>
						</div>
					</CardContent>
					<CardFooter>
						<div className="grid w-full gap-y-4">
							<SignUp.Action submit asChild>
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
							</SignUp.Action>
						</div>
					</CardFooter>
				</Card>
			</SignUp.Strategy>
		</SignUp.Step>
	);
}
