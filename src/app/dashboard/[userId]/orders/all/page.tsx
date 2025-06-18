"use client";

import {
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

import { Button } from "@/components/ui/button";
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
import { columns } from "@/features/dashboard/components/data-table";
import { allOrdersColumn, Order } from "./columns";

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

export default function OrdersPage() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable<Order>({
		data: allOrders,
		columns: allOrdersColumn,
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
