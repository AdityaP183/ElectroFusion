import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function TotalStock({
	data,
}: {
	data: { id: number; productName: string; stock: number }[];
}) {
	return (
		<Card className="w-full col-span-2 bg-transparent glass dark:bg-secondary/40">
			<CardHeader>
				<CardTitle className="text-2xl">Low Stock Products</CardTitle>
				<CardDescription>
					Add more stock to your products
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					{data && data.length === 0 && (
						<TableCaption className="">
							No Products Found
						</TableCaption>
					)}
					<TableHeader>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Stock Left</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data &&
							data.length > 0 &&
							data.map((product) => {
								return (
									<TableRow key={product.id}>
										<TableCell>{product.id}</TableCell>
										<TableCell>
											{product.productName.length > 50
												? `${product.productName.slice(
														0,
														50
												  )}...`
												: product.productName}
										</TableCell>
										<TableCell>{product.stock}</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
