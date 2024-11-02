import { ColorToggle } from "@/components/app/common";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";

const Preferences = () => {
	const { theme, setTheme } = useTheme();

	return (
		<Card>
			<CardHeader className="">
				<CardTitle className="text-2xl">Preferences</CardTitle>
				<CardDescription>
					Customize the appearance of the app
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<div>
						<h4 className="text-lg font-medium">Theme</h4>
						<p className="text-muted-foreground">
							Change the theme of the app
						</p>
					</div>
					<div className="flex items-center gap-3 p-3">
						<div
							className="space-y-2 cursor-pointer"
							onClick={() => setTheme("light")}
						>
							<div
								className={`items-center p-1 border-2 rounded-md ${
									theme === "light"
										? "border-primary"
										: "border-muted"
								} hover:border-accent`}
							>
								<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
									<div className="p-2 space-y-2 bg-white rounded-md shadow-sm">
										<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2 ml-1">
								<div
									className={`w-3 h-3 rounded-full ${
										theme === "light"
											? "bg-primary"
											: "bg-transparent border border-primary"
									}`}
								/>
								<span>Light</span>
							</div>
						</div>
						<div
							className="space-y-2 cursor-pointer"
							onClick={() => setTheme("dark")}
						>
							<div
								className={`items-center p-1 border-2 rounded-md ${
									theme === "dark"
										? "border-primary"
										: "border-muted"
								} bg-popover hover:bg-accent hover:text-accent-foreground`}
							>
								<div className="p-2 space-y-2 rounded-sm bg-slate-950">
									<div className="p-2 space-y-2 rounded-md shadow-sm bg-slate-800">
										<div className="h-2 w-[80px] rounded-lg bg-slate-400" />
										<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
									</div>
									<div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
										<div className="w-4 h-4 rounded-full bg-slate-400" />
										<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
									</div>
									<div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
										<div className="w-4 h-4 rounded-full bg-slate-400" />
										<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2 ml-1">
								<div
									className={`w-3 h-3 rounded-full ${
										theme === "dark"
											? "bg-primary"
											: "bg-transparent border border-primary"
									}`}
								/>
								<span>Dark</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between w-1/2">
					<div>
						<h4 className="text-lg font-medium">Theme Color</h4>
						<p className="text-muted-foreground">
							Change the theme color of the app
						</p>
					</div>
					<div>
						<ColorToggle />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
export default Preferences;
