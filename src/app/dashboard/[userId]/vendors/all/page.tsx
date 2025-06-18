"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
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
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<(typeof allVendors)[0]>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="flex items-center">
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
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.firstName} {row.original.lastName}
			</div>
		),
	},
	{
		accessorKey: "contactEmail",
		header: "Contact Email",
		cell: ({ row }) => (
			<div className="flex items-center">
				{row.original.contactEmail ?? "-"}
			</div>
		),
	},
	{
		accessorKey: "_creationTime",
		header: "Joined On",
		cell: ({ row }) => (
			<div className="flex items-center">
				{format(
					new Date(row.original._creationTime),
					"dd MMM yyyy hh:mm:ss"
				)}
			</div>
		),
	},
	{
		accessorKey: "contactPhone",
		header: "Contact Phone",
		cell: ({ row }) => (
			<div className="flex items-center">{row.original.contactPhone}</div>
		),
	},
	{
		accessorKey: "shops",
		header: "Shops",
		cell: ({ row }) => (
			<div className="flex flex-wrap items-center gap-2">
				{row.original.shops.length > 0 &&
					row.original.shops.map((shop) => <Badge key={shop._id} variant="outline">{shop.name}</Badge>)}
			</div>
		),
	},
];

const allVendors = [
	{
		_creationTime: 1750162303681.288,
		_id: "jh7araywcvy838ndpnhp0fmaxs7j0s2r",
		contactEmail: "adityaprasad1837@gmail.com",
		contactPhone: "8102002032",
		email: "adityaprasad1837@gmail.com",
		firstName: "Thor",
		lastName: "Odinson",
		shops: [
			{
				_creationTime: 1749558106013.647,
				_id: "jd769pers71w05wa09a3kezzr17hjn7g",
				bannerImage:
					"https://res.cloudinary.com/aditya1837/image/upload/v1749558104/ElectroFusion/vendor-shops/e5h5nk1ifgohtnw35prk.jpg",
				description:
					"ElectroMart – Your one-stop destination for the latest smartphones, accessories, and unbeatable mobile deals. Experience cutting-edge technology with top brands, expert advice, and hassle-free service under one roof.",
				logo: "https://res.cloudinary.com/aditya1837/image/upload/v1749558104/ElectroFusion/vendor-shops/xnswvdyw0fwygwgj9ead.svg",
				name: "ElectroMart",
				slug: "electromart",
				vendorId: "jh7araywcvy838ndpnhp0fmaxs7j0s2r",
			},
			{
				_creationTime: 1749564461029.4253,
				_id: "jd7ep42fx5twmzhcbsgfymv36s7hj3qv",
				bannerImage:
					"https://res.cloudinary.com/aditya1837/image/upload/v1749564459/ElectroFusion/vendor-shops/box5qe31uxinz654zyrm.jpg",
				description:
					"Step into a world of immersive sound. Where sound lovers find their perfect match.",
				logo: "https://res.cloudinary.com/aditya1837/image/upload/v1749564458/ElectroFusion/vendor-shops/omdguvhw0jtao2otj1tj.svg",
				name: "Sonic Haven",
				slug: "sonic-haven",
				vendorId: "jh7araywcvy838ndpnhp0fmaxs7j0s2r",
			},
		],
		userId: "j573x6yra0h0je6sd2re4q9qfh7ftw8q",
	},
];

export default function AllVendors() {
	// const currentUser = useQuery(api.users.getCurrentUser);
	// const allVendorsW = useQuery(api.vendor.getAllVendors, {
	// 	role: currentUser?.role || "customer",
	// });

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable<(typeof allVendors)[0]>({
		data: allVendors,
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
				<h1 className="text-2xl font-bold">Manage all vendors</h1>
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
							Todo
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader className="overflow-hidden">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className="bg-secondary/20"
								>
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
			</div>
		</div>
	);
}
