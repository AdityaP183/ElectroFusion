import MultipleSelector, { Option } from "@/components/ui/multi-selector";

export default async function CategorySelector() {
	const OPTIONS: Option[] = [
		{ label: "nextjs", value: "nextjs" },
		{ label: "React", value: "react" },
		{ label: "Remix", value: "remix" },
		{ label: "Vite", value: "vite" },
		{ label: "Nuxt", value: "nuxt" },
		{ label: "Vue", value: "vue" },
		{ label: "Svelte", value: "svelte" },
		{ label: "Angular", value: "angular" },
		{ label: "Ember", value: "ember", disable: true },
		{ label: "Gatsby", value: "gatsby", disable: true },
		{ label: "Astro", value: "astro" },
	];

	return (
		<div className="w-full px-2">
            <h2 className="font-semibold mb-2">Select Categories</h2>
			<MultipleSelector
				defaultOptions={OPTIONS}
				placeholder="Select frameworks you like..."
				emptyIndicator={
					<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
						no results found.
					</p>
				}
                badgeClassName="bg-accent text-foreground"
			/>
		</div>
	);
}
