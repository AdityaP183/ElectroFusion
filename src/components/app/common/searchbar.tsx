import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Searchbar = ({
	mainStyle,
	inputStyle,
	searchValue,
	onSearchValueChange,
	placeholder = "Search...",
}: {
	mainStyle?: string;
	inputStyle?: string;
	searchValue: string;
	onSearchValueChange: (value: string) => void;
	placeholder?: string;
}) => {
	return (
		<div
			className={cn(
				"flex items-center gap-2 px-3 py-1 border rounded-2xl border-border",
				mainStyle
			)}
		>
			<Search />
			<Input
				transparent
				className={cn("border-none outline-none", inputStyle)}
				placeholder={placeholder}
				value={searchValue}
				onChange={(e) => onSearchValueChange(e.target.value)}
			/>
		</div>
	);
};

export default Searchbar;
