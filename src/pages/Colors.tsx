import { useTheme } from "next-themes";

const colors = [
	"accent",
	"accent-foreground",
	"background",
	"border",
	"card",
	"card-foreground",
	"chart1",
	"chart2",
	"chart3",
	"chart4",
	"chart5",
	"destructive",
	"destructiveForeground",
	"success",
	"successForeground",
	"foreground",
	"input",
	"muted",
	"mutedForeground",
	"popover",
	"popoverForeground",
	"primary",
	"primaryForeground",
	"ring",
	"secondary",
	"secondaryForeground",
];

const Colors = () => {
	const { theme } = useTheme();
	return (
		<div className="flex items-center justify-center w-full h-screen bg-slate-500">
			<div>
				<h1 className="capitalize">{theme} Mode</h1>
				<div className="grid grid-cols-4 gap-4">
					{colors.map((color) => (
						<div
							key={color}
							className={`flex items-center justify-center w-10 h-10 rounded-full bg-${color}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default Colors;
