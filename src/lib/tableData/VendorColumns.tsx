import { CustomerReview, Orders, Products } from "@/types/component.type";
import { ColumnDef } from "@tanstack/react-table";
import { formatISODate, formatValueWithIndianNumericPrefix } from "../utils";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Ellipsis } from "lucide-react";

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
			const date = formatISODate(row.getValue("date"), "datetime");
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
			const date = formatISODate(row.getValue("date"), "datetime");
			return date;
		},
	},
	{
		accessorKey: "rating",
		header: "Rating",
	},
];

export const VendorOrderFullColumns: ColumnDef<Orders>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "productName",
		header: "Product Name",
		cell: ({ row }) => {
			return (
				<div className="capitalize">{row.getValue("productName")}</div>
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: "date",
		header: "Ordered On",
		cell: ({ row }) => {
			const date = formatISODate(row.getValue("date"), "datetime");
			return date;
		},
		enableHiding: false,
	},
	{
		accessorKey: "customer",
		header: "Customer",
	},
	{
		accessorKey: "vendor",
		header: "Vendor",
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const price = parseFloat(row.getValue("price"));

			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "INR",
			}).format(price);

			return <div>{formatted}</div>;
		},
		enableHiding: false,
	},
	{
		accessorKey: "status",
		header: () => {
			return <div className="text-center">Status</div>;
		},
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
		enableHiding: false,
	},
	{
		accessorKey: "actions",
		enableHiding: false,
		header: () => {
			return <div className="text-center">Actions</div>;
		},
		cell: ({ row }) => {
			const orderId = row.original.id;

			return (
				<div className="flex items-center justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="w-8 h-8 p-0">
								<span className="sr-only">Open menu</span>
								<Ellipsis className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Link
									to={`/vendor/orders/${orderId}`}
									replace={true}
									className="w-full"
								>
									Edit
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];