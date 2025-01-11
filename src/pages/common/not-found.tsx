import { Button } from "@/components/ui/button";
import { Ban, Flag } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
	const params = useSearchParams();
	const redirectType = params[0].get("type");

	return (
		<div className="grid h-screen px-8 mx-auto text-center place-items-center">
			{redirectType === "unauthorized" ? (
				<div>
					<Ban className="w-20 h-20 mx-auto text-red-500" />
					<h1 className="mt-10 text-3xl leading-snug md:text-4xl">
						Error 403 <br /> It looks like you are not authorized to
						access this page
					</h1>
					<p className="mx-auto mt-8 text-xl font-normal mb-14 text-muted-foreground md:max-w-sm">
						You do not have permission to access this page. Login to
						continue
					</p>
					<div className="flex items-center justify-center gap-4">
						<Button onClick={() => navigate("/")}>Go Home</Button>
                        <Button variant="secondary" onClick={() => navigate("/login")}>Login</Button>
					</div>
				</div>
			) : (
				<div>
					<Flag className="w-20 h-20 mx-auto" />
					<h1 className="mt-10 text-3xl leading-snug md:text-4xl">
						Error 404 <br /> It looks like this page doesn&apos;t
						exist
					</h1>
					<p className="mt-8 mb-14 text-[18px] font-normal text-muted-foreground mx-auto md:max-w-sm">
						The page you are looking for might have been removed,
						had its name changed or is not available.
					</p>
					<Button onClick={() => navigate("/")}>Go Home</Button>
				</div>
			)}
		</div>
	);
}
