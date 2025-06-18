import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function FeaturesLoading() {
	return (
		<div className="mx-4 md:mx-10">
			<Card className="w-full h-[400px] md:h-[500px] overflow-hidden">
				<CardContent className="p-0 h-full">
					<div className="flex flex-col md:flex-row items-center h-full">
						<div className="flex-1 p-6 md:p-10 space-y-4">
							<div className="h-8 bg-muted animate-pulse rounded-md w-3/4"></div>
							<div className="h-4 bg-muted animate-pulse rounded-md w-1/2"></div>
							<div className="h-6 bg-muted animate-pulse rounded-md w-1/3"></div>
							<div className="h-12 bg-muted animate-pulse rounded-md w-1/4"></div>
						</div>
						<div className="flex-1 p-6 flex items-center justify-center">
							<div className="w-80 h-80 bg-muted animate-pulse rounded-lg"></div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
	<div className="mx-4 md:mx-10">
		<Card className="w-full h-[400px] md:h-[500px]">
			<CardContent className="h-full flex items-center justify-center">
				<div className="text-center space-y-4">
					<AlertCircle className="h-16 w-16 text-destructive mx-auto" />
					<h3 className="text-2xl font-semibold">
						Unable to Load Featured Products
					</h3>
					<p className="text-muted-foreground max-w-md">
						We&apos;re having trouble loading the featured products.
						Please try again.
					</p>
					{onRetry && (
						<Button onClick={onRetry} variant="outline">
							Try Again
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	</div>
);
