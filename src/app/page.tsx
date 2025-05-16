import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex justify-between items-center p-4 gap-4 h-16">
			<SignedIn>
				<UserButton />
			</SignedIn>
			Home Page
		</div>
	);
}
