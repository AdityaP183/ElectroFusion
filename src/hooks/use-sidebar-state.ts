import { useState, useMemo } from "react";
import { SidebarLink } from "@/lib/app-data";

export function useSidebarState(
	pathname: string,
	navLinks: SidebarLink[],
	otherLinks: SidebarLink[]
) {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(
		{}
	);

	useMemo(() => {
		const initialOpenState: Record<string, boolean> = {};

		const checkAndMarkActive = (links: SidebarLink[]) => {
			links.forEach((link) => {
				if (link.items?.length) {
					const isActive = link.items.some(
						(subItem) =>
							pathname === subItem.href ||
							pathname.startsWith(`${subItem.href}/`)
					);
					if (isActive) initialOpenState[link.id] = true;
				}
			});
		};

		checkAndMarkActive(navLinks);
		checkAndMarkActive(otherLinks);

		setOpenSections(initialOpenState);
	}, [pathname, navLinks, otherLinks]);

	const toggleSection = (id: string) => {
		setOpenSections((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	return {
		openSections,
		toggleSection,
	};
}
