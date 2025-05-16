import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers/app-provider";
import { dark } from "@clerk/themes";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ElectroFusion - Your Electronics Hub",
	description:
		"Shop the latest tech gadgets and electronics at ElectroFusion.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ClerkProvider dynamic appearance={{ baseTheme: dark }}>
					<Providers>{children}</Providers>
				</ClerkProvider>
			</body>
		</html>
	);
}
