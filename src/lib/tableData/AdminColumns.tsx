import {
	Categories,
	Orders,
	Products,
	SalesType,
	User,
	Vendors,
} from "@/types/component.type";
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
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AdminCategoryColumns: ColumnDef<Categories>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "sold",
		header: "Items Sold",
		cell: ({ row }) => {
			const itemsSold = formatValueWithIndianNumericPrefix(
				row.getValue("sold"),
				"value"
			);
			return itemsSold;
		},
	},
];

export const AdminOrderColumns: ColumnDef<Orders>[] = [
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
			const date = new Date(row.getValue("date")).toLocaleString();
			return date;
		},
	},
	{
		accessorKey: "customer",
		header: "Customer",
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const price = formatValueWithIndianNumericPrefix(
				row.getValue("price"),
				"price"
			);
			return price;
		},
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
	},
];

export const AdminOrderFullColumns: ColumnDef<Orders>[] = [
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
		cell: () => {
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
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

export const AdminProductsFullColumns: ColumnDef<Products>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "image",
		header: "Image",
		cell: ({ row }) => {
			return (
				<Avatar shape="square" className="w-20 h-20">
					<AvatarImage src={row.getValue("image")} />
					<AvatarFallback>Image</AvatarFallback>
				</Avatar>
			);
		},
	},
	{
		accessorKey: "productName",
		header: "Product Name",
		cell: ({ row }) => {
			return (
				<div className="capitalize">{row.getValue("productName")}</div>
			);
		},
	},
	{
		accessorKey: "category",
		header: "Category",
		cell: ({ row }) => {
			return <div className="capitalize">{row.getValue("category")}</div>;
		},
	},
	{
		accessorKey: "stock",
		header: "Stock",
		cell: ({ row }) => {
			const quantity = formatValueWithIndianNumericPrefix(
				row.getValue("stock")
			);
			return quantity;
		},
	},
	{
		accessorKey: "price",
		header: () => (
			<div className="capitalize">
				<h4>Price</h4>
				<span className="text-sm lowercase">per unit</span>
			</div>
		),
		cell: ({ row }) => {
			const price = formatValueWithIndianNumericPrefix(
				row.getValue("price"),
				"price"
			);

			return price;
		},
	},
];

export const AdminVendorsFullColumns: ColumnDef<Vendors>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "store_name",
		header: "Store",
		cell: ({ row }) => {
			return (
				<div className="capitalize">{row.getValue("store_name")}</div>
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: "owner",
		header: "Owner",
		cell: ({ row }) => {
			const owner: User = row.getValue("owner");
			return (
				<div className="capitalize">{`${owner.firstName} ${owner.lastName}`}</div>
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: "owner.email",
		header: "Email",
	},
	{
		accessorKey: "monthly_sales",
		header: "Monthly Sales",
		cell: ({ row }) => {
			const monthly_sales = formatValueWithIndianNumericPrefix(
				row.getValue("monthly_sales"),
				"price"
			);
			return monthly_sales;
		},
		enableHiding: false,
	},
];

export const AdminCustomersFullColumns: ColumnDef<User>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "first_name",
		header: "First Name",
	},
	{
		accessorKey: "last_name",
		header: "Last Name",
	},
	{
		accessorKey: "email",
		header: "Email",
		enableHiding: false,
	},
	{
		accessorKey: "username",
		header: "Username",
		enableHiding: false,
	},
	{
		accessorKey: "orders",
		header: "Total Orders",
		cell: ({ row }) => {
			const orders = formatValueWithIndianNumericPrefix(
				row.getValue("orders")
			);
			return orders;
		},
		enableHiding: false,
	},
];

export const SalesFullColumns: ColumnDef<SalesType>[] = [
	{
		accessorKey: "rowId",
		header: "No.",
		cell: ({ row }) => {
			return <div className="px-2">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "sales",
		header: "Sales",
		cell: ({ row }) => {
			const sales = formatValueWithIndianNumericPrefix(
				row.getValue("sales")
			);
			return sales;
		},
	},
	{
		accessorKey: "profit",
		header: "Profit",
		cell: ({ row }) => {
			const profit = formatValueWithIndianNumericPrefix(
				row.getValue("profit")
			);
			return profit;
		},
	},
];
