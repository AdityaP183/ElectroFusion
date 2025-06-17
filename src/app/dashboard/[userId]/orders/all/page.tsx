"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { Filter } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Temporary orders data
const allOrders = [
	{
		id: "ORD-001",
		customerName: "John Doe",
		purchasedPrice: 125.99,
		orderStatus: "delivered",
		orderedOn: "2024-01-15",
		deliveryOn: "2024-01-20",
	},
	{
		id: "ORD-002",
		customerName: "Jane Smith",
		purchasedPrice: 89.5,
		orderStatus: "pending",
		orderedOn: "2024-01-18",
		deliveryOn: "2024-01-25",
	},
	{
		id: "ORD-003",
		customerName: "Mike Johnson",
		purchasedPrice: 234.75,
		orderStatus: "shipped",
		orderedOn: "2024-01-12",
		deliveryOn: "2024-01-22",
	},
	{
		id: "ORD-004",
		customerName: "Sarah Wilson",
		purchasedPrice: 67.25,
		orderStatus: "cancelled",
		orderedOn: "2024-01-16",
		deliveryOn: null,
	},
	{
		id: "ORD-005",
		customerName: "David Brown",
		purchasedPrice: 156.8,
		orderStatus: "processing",
		orderedOn: "2024-01-19",
		deliveryOn: "2024-01-26",
	},
	{
		id: "ORD-006",
		customerName: "Emily Davis",
		purchasedPrice: 98.4,
		orderStatus: "delivered",
		orderedOn: "2024-01-10",
		deliveryOn: "2024-01-17",
	},
	{
		id: "ORD-007",
		customerName: "Robert Martinez",
		purchasedPrice: 312.6,
		orderStatus: "shipped",
		orderedOn: "2024-01-20",
		deliveryOn: "2024-01-27",
	},
	{
		id: "ORD-008",
		customerName: "Lisa Anderson",
		purchasedPrice: 45.99,
		orderStatus: "pending",
		orderedOn: "2024-01-21",
		deliveryOn: "2024-01-28",
	},
	{
		id: "ORD-009",
		customerName: "Chris Taylor",
		purchasedPrice: 189.25,
		orderStatus: "processing",
		orderedOn: "2024-01-17",
		deliveryOn: "2024-01-24",
	},
	{
		id: "ORD-010",
		customerName: "Amanda White",
		purchasedPrice: 78.9,
		orderStatus: "delivered",
		orderedOn: "2024-01-14",
		deliveryOn: "2024-01-21",
	},
];

const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "delivered":
			return "bg-green-500/40 border-green-500 text-white";
		case "shipped":
			return "bg-blue-500/40 border-blue-500 text-white";
		case "processing":
			return "bg-yellow-500/40 border-yellow-500 text-white";
		case "pending":
			return "bg-orange-500/40 border-orange-500 text-white";
		case "cancelled":
			return "bg-red-500/40 border-red-500 text-white";
		default:
			return "bg-gray-500/40 border-gray-500 text-white";
	}
};

export const columns: ColumnDef<(typeof allOrders)[0]>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: "Order ID",
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue("id")}</div>
		),
	},
	{
		accessorKey: "customerName",
		header: "Customer Name",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("customerName")}</div>
		),
	},
	{
		accessorKey: "purchasedPrice",
		header: () => <div>Purchased Price</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("purchasedPrice"));

			// Format the amount as a dollar amount
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "orderStatus",
		header: () => <div>Order Status</div>,
		cell: ({ row }) => {
			const status = row.getValue("orderStatus") as string;
			return (
				<Badge
					className={cn(
						"font-semibold capitalize",
						getStatusColor(status)
					)}
				>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "orderedOn",
		header: () => <div>Ordered On</div>,
		cell: ({ row }) => {
			const date = new Date(row.getValue("orderedOn"));
			return (
				<div className="text-sm">
					{date.toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</div>
			);
		},
	},
	{
		accessorKey: "deliveryOn",
		header: () => <div>Delivery On</div>,
		cell: ({ row }) => {
			const deliveryDate = row.getValue("deliveryOn");
			if (!deliveryDate) {
				return (
					<Badge variant="secondary" className="text-xs">
						N/A
					</Badge>
				);
			}
			const date = new Date(deliveryDate as string);
			return (
				<div className="text-sm">
					{date.toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</div>
			);
		},
	},
];

export default function OrdersPage() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable<(typeof allOrders)[0]>({
		data: allOrders,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full h-full overflow-y-auto">
			<div className="px-5 mb-5">
				<h1 className="text-2xl font-bold">Manage all orders</h1>
			</div>

			<div className="w-full px-5">
				<div className="flex items-center py-4">
					<Input
						placeholder="Filter orders..."
						value={
							(table
								.getColumn("customerName")
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table
								.getColumn("customerName")
								?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Filters <Filter />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id === "id"
												? "Order ID"
												: column.id === "customerName"
												? "Customer Name"
												: column.id === "purchasedPrice"
												? "Purchased Price"
												: column.id === "orderStatus"
												? "Order Status"
												: column.id === "orderedOn"
												? "Ordered On"
												: column.id === "deliveryOn"
												? "Delivery On"
												: column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column
																.columnDef
																.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={
											row.getIsSelected() && "selected"
										}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="text-muted-foreground flex-1 text-sm">
						{table.getFilteredSelectedRowModel().rows.length} of{" "}
						{table.getFilteredRowModel().rows.length} row(s)
						selected.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
