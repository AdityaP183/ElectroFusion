import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { tempUser } from "@/lib/app-data";
import { AdminProfile } from "@/pages/admin";
import { useState } from "react";

const Settings = () => {
	const [activeTab, setActiveTab] = useState<"profile" | "preferences">(
		"profile"
	);
	const { role } = tempUser;

	return (
		<div className="w-full h-full py-3">
			<div className="space-y-1">
				<h1 className="text-3xl font-bold">Settings</h1>
				<p className="text-sm text-muted-foreground">
					Manage your account settings
				</p>
			</div>
			<Separator className="my-4" />
			{/* <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="-mx-4 lg:w-1/5"></aside>
				<div className="flex-1 lg:max-w-2xl"></div>
			</div> */}
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
					{activeTab === "profile" ? (
						<div>{role === "admin" && <AdminProfile />}</div>
					) : (
						activeTab === "preferences" && <div>Preferences</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Settings;
