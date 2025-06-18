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
import { allProducts } from "@/lib/app-data";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const columns: ColumnDef<(typeof allProducts)[0]>[] = [
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
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("name")}</div>
			),
		},
		{
			accessorKey: "originalPrice",
			header: () => <div>Original Price</div>,
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("originalPrice"));

				// Format the amount as a dollar amount
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(amount);

				return <div className="font-medium">{formatted}</div>;
			},
		},
		{
			accessorKey: "isDiscounted",
			header: () => <div>Is Discounted</div>,
			cell: ({ row }) => {
				const isDiscounted = row.getValue("isDiscounted");
				return (
					<Badge variant={isDiscounted ? "default" : "secondary"}>
						{isDiscounted ? "Yes" : "No"}
					</Badge>
				);
			},
		},
		{
			accessorKey: "isActive",
			header: () => <div>Is Active</div>,
			cell: ({ row }) => {
				const isActive = row.getValue("isActive");
				return (
					<Badge
						className={cn(
							"font-semibold text-white",
							isActive
								? "bg-green-500/40 border-green-500"
								: "bg-red-500/40 border-red-500"
						)}
					>
						{isActive ? "Active" : "Not Active"}
					</Badge>
				);
			},
		},
		{
			accessorKey: "stock",
			header: () => <div>Stock</div>,
		},
		{
			accessorKey: "purchaseCount",
			header: () => <div>Total Purchases</div>,
		},
		{
			accessorKey: "categories",
			header: () => <div>Categories</div>,
			cell: ({ row }) => {
				const categories = row.getValue("categories") as {
					_id: string;
					name: string;
					slug: string;
					parentId: string;
					_creationTime: number;
				}[];

				if (!categories?.length) {
					return (
						<Badge variant="secondary" className="text-xs">
							No Categories
						</Badge>
					);
				}

				return (
					<div className="flex flex-wrap gap-1">
						{categories.map((category) => (
							<Badge
								key={category._id}
								variant="secondary"
								className="text-xs"
							>
								{category.name}
							</Badge>
						))}
					</div>
				);
			},
		},
	];
	const table = useReactTable<(typeof allProducts)[0]>({
		data: allProducts,
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
				<h1 className="text-2xl font-bold">Manage all products</h1>
			</div>

			<div className="w-full px-5">
				<div className="flex items-center py-4">
					<Input
						placeholder="Filter products..."
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
											{column.id}
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
