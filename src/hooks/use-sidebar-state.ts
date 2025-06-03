import { useState, useMemo } from "react";
import { SidebarLink } from "@/lib/app-data";

export function useSidebarState(
	pathname: string,
	navLinks: SidebarLink[],
	otherLinks: SidebarLink[]
) {
	// Active state management for expandable sections
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(
		{}
	);

	// Pre-compute initial open state based on active paths
	useMemo(() => {
		const initialOpenState: Record<string, boolean> = {};

		// Function to check if any link should be open
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

		// Check both navigation menus
		checkAndMarkActive(navLinks);
		checkAndMarkActive(otherLinks);

		setOpenSections(initialOpenState);
	}, [pathname, navLinks, otherLinks]);

	// Handle section toggle
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
