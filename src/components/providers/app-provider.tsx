"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider, useTheme } from "next-themes";
import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ConvexClientProvider>
			<NuqsAdapter>
				<ThemeProvider
					enableSystem
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					{children}
					<ToasterProvider />
				</ThemeProvider>
			</NuqsAdapter>
		</ConvexClientProvider>
	);
}

function ToasterProvider() {
	const { resolvedTheme } = useTheme();

	return (
		<Toaster
			closeButton
			position="top-center"
			theme={resolvedTheme === "dark" ? "dark" : "light"}
		/>
	);
}
