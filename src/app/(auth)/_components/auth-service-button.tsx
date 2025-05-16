"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthProviderButtonProps {
	iconSrc: string;
	alt: string;
	authType: "sign-up" | "sign-in";
	providerName: string;
	className?: string;
}

function AuthServiceButton({
	iconSrc,
	alt,
	authType,
	providerName,
	className,
}: AuthProviderButtonProps) {
	const actionText =
		authType === "sign-up" ? `Sign up with` : `Continue with`;
	return (
		<Button className={cn("flex items-center gap-2", className)}>
			<Image src={iconSrc} alt={alt} width={20} height={20} />
			<span className="font-semibold">{`${actionText} ${providerName}`}</span>
		</Button>
	);
}

function GoogleButton({
	authType,
	className,
}: {
	authType: "sign-up" | "sign-in";
	className?: string;
}) {
	return (
		<AuthServiceButton
			iconSrc="/assets/google.svg"
			alt="Google"
			authType={authType}
			providerName="Google"
			className={cn("cursor-pointer shadow-xl", className)}
		/>
	);
}

function AppleButton({
	authType,
	className,
}: {
	authType: "sign-up" | "sign-in";
	className?: string;
}) {
	return (
		<AuthServiceButton
			iconSrc="/assets/apple.svg"
			alt="Apple"
			authType={authType}
			providerName="Apple"
			className={cn("cursor-pointer shadow-xl", className)}
		/>
	);
}

export { GoogleButton, AppleButton };
