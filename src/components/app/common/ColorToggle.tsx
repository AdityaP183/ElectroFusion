import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useThemeContext from "@/context/theme/useThemeContext";
import { cn } from "@/lib/utils";
import { ThemeColors } from "@/types/utils.types";
import { useTheme } from "next-themes";

const availableThemeColors = [
	{ name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
	{ name: "Slate", light: "bg-slate-500", dark: "bg-slate-700" },
	{ name: "Stone", light: "bg-stone-500", dark: "bg-stone-700" },
	{ name: "Red", light: "bg-red-600", dark: "bg-red-700" },
	{ name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
	{ name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
	{ name: "Violet", light: "bg-violet-600", dark: "bg-violet-500" },
];

const ColorToggle = () => {
	const { themeColor, setThemeColor } = useThemeContext();
	const { theme } = useTheme();

	const createSelectItems = () => {
		return availableThemeColors.map(({ name, light, dark }) => {
			return (
				<SelectItem key={name} value={name}>
					<div className="flex items-center space-x-3">
						<div
							className={cn(
								"rounded-full w-[20px] h-[20px]",
								theme === "light" ? light : dark
							)}
						/>
						<span className="text-sm">{name}</span>
					</div>
				</SelectItem>
			);
		});
	};
	return (
		<Select
			defaultValue={themeColor}
			onValueChange={(value) => setThemeColor(value as ThemeColors)}
		>
			<SelectTrigger className="w-fit md:w-[180px] ring-offset-transparent focus:ring-transparent">
				<SelectValue placeholder="Select Color" />
			</SelectTrigger>
			<SelectContent className="border-muted">
				{createSelectItems()}
			</SelectContent>
		</Select>
	);
};
export default ColorToggle;
