import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";

interface LogoProps {
	mainStyle?: string;
	avatarStyle?: string;
	textStyle?: string;
	avatarUrl?: string;
}

export default function Logo({
	mainStyle,
	avatarStyle,
	textStyle,
	avatarUrl,
}: LogoProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-2 p-2 cursor-pointer",
				mainStyle
			)}
		>
			<Avatar className={cn("w-6 h-6", avatarStyle)}>
				<AvatarImage src={avatarStyle ? avatarUrl : "/logo.svg"} />
			</Avatar>
			<span className={cn("text-xl font-bold mb-0.5", textStyle)}>
				ElectroFusion
			</span>
		</div>
	);
}
