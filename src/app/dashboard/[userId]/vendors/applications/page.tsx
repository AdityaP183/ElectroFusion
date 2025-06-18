"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useMutation, usePaginatedQuery } from "convex/react";
import { format } from "date-fns";
import {
	ArrowDown,
	ArrowUp,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	XCircle,
} from "lucide-react";
import * as React from "react";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default function VendorApplications() {
	const {
		results: vendorApplications,
		status,
		loadMore,
	} = usePaginatedQuery(
		api.vendorApplication.getVendorApplications,
		{
			sortBy: "_creationTime",
			sortOrder: "desc",
		},
		{ initialNumItems: 10 }
	);

	const [processingId, setProcessingId] = React.useState<string | null>(null);
	const [sorting, setSorting] = React.useState<SortingState>([
		{ id: "_creationTime", desc: true },
	]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	// const { results, status, loadMore } = {
	// 	results: mockResults,
	// 	status: "CanLoadMore" as const,
	// 	loadMore: () => {
	// 		console.log("Loading more applications...");
	// 	},
	// };

	const approveMutation = useMutation(
		api.vendorApplication.approveVendorApplication
	);
	const rejectMutation = useMutation(
		api.vendorApplication.rejectVendorApplication
	);

	const handleApprove = async (applicationId: string) => {
		setProcessingId(applicationId);
		try {
			await approveMutation({
				applicationId: applicationId as Id<"vendorApplications">,
			});
		} catch (error) {
			console.error("Approval failed:", error);
		} finally {
			setProcessingId(null);
		}
	};

	const handleReject = async (applicationId: string) => {
		setProcessingId(applicationId);
		try {
			// await onReject(applicationId);
		} finally {
			setProcessingId(null);
		}
	};

	const columns: ColumnDef<(typeof vendorApplications)[0]>[] = [
		{
			accessorKey: "user",
			header: "Name",
			cell: ({ row }) => {
				const user = row.original.user;
				return (
					<div className="flex items-center gap-3">
						{user && (
							<div>
								<div className="font-medium">
									{user.firstName} {user.lastName}
								</div>
								<div className="text-sm text-muted-foreground">
									{user.email}
								</div>
							</div>
						)}
					</div>
				);
			},
		},
		{
			accessorKey: "contactEmail",
			header: "Contact Email",
			cell: ({ row }) => <div>{row.original.contactEmail}</div>,
		},
		{
			accessorKey: "contactPhone",
			header: "Phone",
			cell: ({ row }) => <div>{row.original.contactPhone}</div>,
		},
		{
			accessorKey: "_creationTime",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
					>
						Applied On
						{column.getIsSorted() === "asc" ? (
							<ArrowDown className="ml-2 h-4 w-4" />
						) : (
							<ArrowUp className="ml-2 h-4 w-4" />
						)}
					</Button>
				);
			},
			cell: ({ row }) => (
				<div>
					{format(
						new Date(row.original._creationTime),
						"dd MMM yyyy, hh:mm a"
					)}
				</div>
			),
		},
		{
			accessorKey: "comment",
			header: "Comment",
			cell: ({ row }) => (
				<div className="max-w-xs">
					<p
						className="text-muted-foreground truncate"
						title={row.original.comment}
					>
						{row.original.comment}
					</p>
				</div>
			),
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const application = row.original;
				const isProcessing = processingId === application._id;

				return (
					<div className="flex items-center gap-2">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
									disabled={isProcessing}
								>
									<CheckCircle className="h-4 w-4 mr-1" />
									Approve
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Approve Application
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to approve this
										vendor application for{" "}
										{application.user ? (
											<strong>
												{application.user.firstName}{" "}
												{application.user.lastName}
											</strong>
										) : (
											<strong>Unkown</strong>
										)}
										? This will create a vendor account and
										delete the application.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() =>
											handleApprove(application._id)
										}
										className="bg-green-600 hover:bg-green-700"
									>
										Approve
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
									disabled={isProcessing}
								>
									<XCircle className="h-4 w-4 mr-1" />
									Reject
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Reject Application
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to reject this
										vendor application? This action cannot
										be undone and the application will be
										permanently deleted.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() =>
											handleReject(application._id)
										}
										className="bg-red-600 hover:bg-red-700"
									>
										Reject
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				);
			},
		},
	];

	const table = useReactTable<(typeof vendorApplications)[0]>({
		data: vendorApplications,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnVisibility,
		},
		initialState: {
			pagination: {
				pageSize: 10,
			},
		},
	});

	return (
		<div className="w-full space-y-4 px-5">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Vendor Applications
					</h2>
					<p className="text-muted-foreground">
						Review and manage vendor registration requests
					</p>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className="bg-secondary/20"
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="font-medium"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
                                    className="hover:bg-transparent"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="py-4"
										>
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
									No applications found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					Showing{" "}
					{table.getState().pagination.pageIndex *
						table.getState().pagination.pageSize +
						1}{" "}
					to{" "}
					{Math.min(
						(table.getState().pagination.pageIndex + 1) *
							table.getState().pagination.pageSize,
						table.getFilteredRowModel().rows.length
					)}{" "}
					of {table.getFilteredRowModel().rows.length} applications
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="h-4 w-4 mr-1" />
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
						<ChevronRight className="h-4 w-4 ml-1" />
					</Button>
				</div>
			</div>

			{/* Processing indicator */}
			{processingId && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-4 rounded-lg">
						<div className="flex items-center space-x-2">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
							<span>Processing application...</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
