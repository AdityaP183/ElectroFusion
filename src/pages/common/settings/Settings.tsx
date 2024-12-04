import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { tempUser } from "@/lib/app-data";
import { useState } from "react";
import Preferences from "./Preferences";
import Profile from "./Profile";

const Settings = () => {
	const [activeTab, setActiveTab] = useState<"profile" | "preferences">(
		"profile"
	);

	return (
		<div className="w-full h-full py-3">
			<div className="space-y-1">
				<h1 className="text-3xl font-bold">Settings</h1>
				<p className="text-sm text-muted-foreground">
					Manage your account settings
				</p>
			</div>
			<Separator className="my-4" />
			<div className="flex gap-6 px-5">
				<div className="flex flex-col flex-[0.5] gap-3">
					<Button
						variant={
							activeTab === "profile" ? "secondary" : "ghost"
						}
						onClick={() => setActiveTab("profile")}
						className="text-xl"
					>
						Profile
					</Button>
					<Button
						variant={
							activeTab === "preferences" ? "secondary" : "ghost"
						}
						onClick={() => setActiveTab("preferences")}
						className="text-xl"
					>
						Preferences
					</Button>
				</div>
				<div className="ml-6 flex-[3]">
					{tempUser && activeTab === "profile" ? (
						<Profile />
					) : (
						<Preferences />
					)}
				</div>
			</div>
		</div>
	);
};
export default Settings;
