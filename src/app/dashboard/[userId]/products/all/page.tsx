"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
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
import { useDebounce } from "@/components/ui/multi-selector";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useVendorStore } from "@/store/use-vendor";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";

export default function ProductsPage() {
	const { user } = useUser();
	const { activeShopId } = useVendorStore();

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [search, setSearch] = React.useState("");
	const [cursor, setCursor] = React.useState<string | null>(null);
	const debouncedSearch = useDebounce(search, 300);

	const dbUser = useQuery(api.vendor.getVendorDetails, {
		clerkId: user?.id || "",
	});

	const shouldFetch =
		activeShopId &&
		dbUser &&
		dbUser._id &&
		typeof activeShopId === "string";

	const allProducts = useQuery(
		api.vendorProducts.getFilteredProducts,
		shouldFetch
			? {
					shopId: activeShopId as Id<"vendorShops">,
					vendorId: dbUser._id as Id<"vendors">,
					search: debouncedSearch || undefined,
					paginationOpts: {
						numItems: pagination.pageSize,
						cursor: cursor ?? null,
					},
			  }
			: "skip"
	);

	const columns: ColumnDef<Doc<"products">>[] = [
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
					currency: "INR",
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

	const table = useReactTable({
		data: allProducts?.page ?? [],
		columns,
		manualPagination: true,
		pageCount: allProducts?.isDone
			? pagination.pageIndex + 1
			: pagination.pageIndex + 2,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination,
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
	});

	console.log(allProducts);
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
						value={search}
						onChange={(e) => setSearch(e.target.value)}
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
							onClick={() => {
								setPagination((prev) => ({
									...prev,
									pageIndex: prev.pageIndex - 1,
								}));
								setCursor(null); // reset to first page if needed
							}}
							disabled={pagination.pageIndex === 0}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								setPagination((prev) => ({
									...prev,
									pageIndex: prev.pageIndex + 1,
								}));
								setCursor(allProducts?.continueCursor ?? null);
							}}
							disabled={allProducts?.isDone}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
