import { CustomerReview, Orders, Products } from "@/types/component.type";
import { ColumnDef } from "@tanstack/react-table";
import { formatISODate, formatValueWithIndianNumericPrefix } from "../utils";
import { Badge } from "@/components/ui/badge";

export const VendorProductsColumns: ColumnDef<Products>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "productName",
		header: "Product Name",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "times_ordered",
		header: "Times Ordered",
		cell: ({ row }) => {
			const timesOrdered = formatValueWithIndianNumericPrefix(
				row.getValue("times_ordered")
			);
			return timesOrdered;
		},
	},
];

export const VendorOrdersColumns: ColumnDef<Orders>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "productName",
		header: "Product Name",
	},
	{
		accessorKey: "date",
		header: "Ordered On",
		cell: ({ row }) => {
			const date = formatISODate(row.getValue("date"));
			return date;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<Badge
					variant={row.getValue("status")}
					className="max-w-[100px] p-1 text-sm mx-auto"
				>
					{row.getValue("status")}
				</Badge>
			);
		},
	},
];

export const VendorCustomerReviewsColumns: ColumnDef<CustomerReview>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "productName",
		header: "Product Name",
	},
	{
		accessorKey: "date",
		header: "Reviews On",
		cell: ({ row }) => {
			const date = formatISODate(row.getValue("date"));
			return date;
		},
	},
	{
		accessorKey: "rating",
		header: "Rating",
	},
];
