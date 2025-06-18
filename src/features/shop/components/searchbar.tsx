"use client";

import { Button } from "@/components/ui/button";
import { Kbd, KbdKey, KbdSeparator } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Searchbar() {
	const [, setOpenSearch] = useState(false);
	return (
		<Button
			variant="outline"
			className={cn(
				"relative h-8 w-fit justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12"
			)}
			onClick={() => setOpenSearch(true)}
		>
			<span className="hidden lg:inline-flex">Search...</span>
			<span className="inline-flex lg:hidden">Search...</span>
			<Kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
				<KbdKey>Ctrl</KbdKey>
				<KbdSeparator />
				<KbdKey>K</KbdKey>
			</Kbd>
		</Button>
	);
}
