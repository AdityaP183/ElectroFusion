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

export default function SignInPage() {
	return (
		<section className="flex items-center justify-center min-h-screen p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-6xl bg-card rounded-xl overflow-hidden shadow-lg"
			>
				<Card className="flex flex-col lg:flex-row p-8 min-h-[600px]">
					<div className="flex-1">
						<SignIn.Root>
							<Clerk.Loading>
								{(isGlobalLoading) => (
									<>
										<EmailPasswordStep isLoading={isGlobalLoading} />
										<PasswordVerificationStep isLoading={isGlobalLoading} />
										<ForgotPasswordStep isLoading={isGlobalLoading} />
										<ResetPasswordStep isLoading={isGlobalLoading} />
									</>
								)}
							</Clerk.Loading>
						</SignIn.Root>
					</div>
					<div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
						<AuthHeroCard texts={signInHeroTexts} />
					</div>
				</Card>
			</motion.div>
		</section>
	);
}

// Email & Password Entry Step
function EmailPasswordStep({ isLoading }: { isLoading: boolean }) {
	return (
		<SignIn.Step name="start">
			<div className="space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
					<p className="text-muted-foreground">
						Sign in to your account to continue
					</p>
				</div>

				{/* Social Login Buttons */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<SocialLoginButton
						provider="google"
						icon={<Icons.google className="w-4 h-4" />}
						label="Google"
						isLoading={isLoading}
					/>
					<SocialLoginButton
						provider="apple"
						icon={<Icons.apple className="w-4 h-4" />}
						label="Apple"
						isLoading={isLoading}
					/>
				</div>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-card px-2 text-muted-foreground">
							Or continue with email
						</span>
					</div>
				</div>

				{/* Email Input */}
				<div className="space-y-4">
					<Clerk.Field name="identifier" className="space-y-2">
						<Clerk.Label asChild>
							<Label htmlFor="email">Email address</Label>
						</Clerk.Label>
						<Clerk.Input type="email" required asChild>
							<Input id="email" placeholder="Enter your email" />
						</Clerk.Input>
						<Clerk.FieldError className="text-sm text-destructive" />
					</Clerk.Field>

					<SignIn.Action submit asChild>
						<Button className="w-full" disabled={isLoading}>
							<Clerk.Loading>
								{(isActionLoading) =>
									isActionLoading ? (
										<Icons.spinner className="w-4 h-4 animate-spin mr-2" />
									) : null
								}
							</Clerk.Loading>
							Continue
						</Button>
					</SignIn.Action>
				</div>

				<div className="text-center">
					<Button variant="link" size="sm" asChild>
						<Clerk.Link navigate="sign-up">
							Don't have an account? Sign up
						</Clerk.Link>
					</Button>
				</div>
			</div>
		</SignIn.Step>
	);
}

// Password Verification Step
function PasswordVerificationStep({ isLoading }: { isLoading: boolean }) {
	return (
		<SignIn.Step name="verifications">
			<SignIn.Strategy name="password">
				<div className="space-y-6">
					<div className="text-center space-y-2">
						<h1 className="text-2xl font-bold tracking-tight">Enter Password</h1>
						<p className="text-muted-foreground">
							Welcome back <SignIn.SafeIdentifier className="font-medium" />
						</p>
					</div>

					<div className="space-y-4">
						<Clerk.Field name="password" className="space-y-2">
							<Clerk.Label asChild>
								<Label htmlFor="password">Password</Label>
							</Clerk.Label>
							<Clerk.Input type="password" asChild>
								<Input id="password" placeholder="Enter your password" />
							</Clerk.Input>
							<Clerk.FieldError className="text-sm text-destructive" />
						</Clerk.Field>

						<SignIn.Action submit asChild>
							<Button className="w-full" disabled={isLoading}>
								<Clerk.Loading>
									{(isActionLoading) =>
										isActionLoading ? (
											<Icons.spinner className="w-4 h-4 animate-spin mr-2" />
										) : null
									}
								</Clerk.Loading>
								Sign In
							</Button>
						</SignIn.Action>

						<div className="text-center">
							<SignIn.Action navigate="forgot-password" asChild>
								<Button type="button" variant="link" size="sm">
									Forgot your password?
								</Button>
							</SignIn.Action>
						</div>
					</div>
				</div>
			</SignIn.Strategy>
		</SignIn.Step>
	);
}

// Forgot Password Step
function ForgotPasswordStep({ isLoading }: { isLoading: boolean }) {
	return (
		<SignIn.Step name="forgot-password">
			<div className="space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
					<p className="text-muted-foreground">
						We'll send you a reset link to your email address
					</p>
				</div>

				<div className="space-y-4">
					<SignIn.SupportedStrategy name="reset_password_email_code" asChild>
						<Button className="w-full">
							Send Reset Email
						</Button>
					</SignIn.SupportedStrategy>

					<SignIn.Action navigate="start" asChild>
						<Button type="button" variant="outline" className="w-full">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Sign In
						</Button>
					</SignIn.Action>
				</div>
			</div>
		</SignIn.Step>
	);
}

// Reset Password Step
function ResetPasswordStep({ isLoading }: { isLoading: boolean }) {
	return (
		<SignIn.Step name="reset-password">
			<SignIn.Strategy name="reset_password_email_code">
				<div className="space-y-6">
					<div className="text-center space-y-2">
						<h1 className="text-2xl font-bold tracking-tight">Create New Password</h1>
						<p className="text-muted-foreground">
							Enter your new password below
						</p>
					</div>

					<div className="space-y-4">
						<Clerk.Field name="password" className="space-y-2">
							<Clerk.Label asChild>
								<Label htmlFor="new-password">New password</Label>
							</Clerk.Label>
							<Clerk.Input type="password" asChild>
								<Input id="new-password" placeholder="Enter new password" />
							</Clerk.Input>
							<Clerk.FieldError className="text-sm text-destructive" />
						</Clerk.Field>

						<Clerk.Field name="confirmPassword" className="space-y-2">
							<Clerk.Label asChild>
								<Label htmlFor="confirm-password">Confirm password</Label>
							</Clerk.Label>
							<Clerk.Input type="password" asChild>
								<Input id="confirm-password" placeholder="Confirm new password" />
							</Clerk.Input>
							<Clerk.FieldError className="text-sm text-destructive" />
						</Clerk.Field>

						<SignIn.Action submit asChild>
							<Button className="w-full" disabled={isLoading}>
								<Clerk.Loading>
									{(isActionLoading) =>
										isActionLoading ? (
											<Icons.spinner className="w-4 h-4 animate-spin mr-2" />
										) : null
									}
								</Clerk.Loading>
								Update Password
							</Button>
						</SignIn.Action>
					</div>
				</div>
			</SignIn.Strategy>
		</SignIn.Step>
	);
}

// Reusable Social Login Button Component
function SocialLoginButton({
	provider,
	icon,
	label,
	isLoading
}: {
	provider: string;
	icon: React.ReactNode;
	label: string;
	isLoading: boolean;
}) {
	return (
		<Clerk.Connection name={provider} asChild>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				className="w-full"
			>
				<Clerk.Loading scope={`provider:${provider}`}>
					{(isProviderLoading) =>
						isProviderLoading ? (
							<Icons.spinner className="w-4 h-4 animate-spin" />
						) : (
							<>
								{icon}
								<span className="ml-2">{label}</span>
							</>
						)
					}
				</Clerk.Loading>
			</Button>
		</Clerk.Connection>
	);
}
