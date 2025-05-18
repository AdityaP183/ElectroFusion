import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Searchfilter({search, setSearch}: Props) {
	return (
		<div className="relative px-2">
			<Input
				className="pe-10"
				placeholder="Search..."
				type="email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-1 flex h-full w-10 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Subscribe"
			>
				<Search size={16} aria-hidden="true" />
			</button>
		</div>
	);
}
