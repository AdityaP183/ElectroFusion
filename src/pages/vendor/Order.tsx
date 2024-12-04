import Searchbar from "@/components/app/common/Searchbar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { TableWrapper } from "@/components/ui/table";
import { ordersData } from "@/lib/app-data";
import { VendorOrderFullColumns } from "@/lib/tableData/VendorColumns";
import { Orders } from "@/types/component.type";
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, Filter } from "lucide-react";
import { useMemo, useState } from "react";

const Order = () => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		image: true,
	});

	const orders = useMemo<Orders[]>(() => ordersData, []);

	const columns = useMemo<ColumnDef<Orders>[]>(
		() => VendorOrderFullColumns,
		[]
	);

	const table = useReactTable({
		data: orders,
		columns: columns,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnFilters,
			columnVisibility,
		},
	});

	console.log("Rendering Orders...");

	return (
		<div className="w-full p-1">
			<div className="flex items-center justify-between w-full my-4">
				<Searchbar
					searchValue={
						(table
							.getColumn("productName")
							?.getFilterValue() as string) || ""
					}
					onSearchValueChange={(e) =>
						table.getColumn("productName")?.setFilterValue(e)
					}
					mainStyle="max-w-[450px]"
					placeholder="Search orders by name"
				/>
				<div className="flex items-center gap-4">
					<Popover>
						<PopoverTrigger
							asChild
							className="flex items-center gap-2"
						>
							<Button variant="outline" className="rounded-lg">
								<h4>Filter</h4>
								<Filter className="w-4 h-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent asChild>
							<div>
								<div className="flex items-center gap-1 mb-2">
									<Filter className="w-4 h-4" />
									<h2 className="">Filters</h2>
								</div>
								<Separator />
							</div>
						</PopoverContent>
					</Popover>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="ml-auto rounded-lg"
							>
								Columns <ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => (
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
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="w-full h-full overflow-auto">
				<TableWrapper<Orders>
					table={table}
					columnsLength={columns.length}
				/>
			</div>
			<div className="flex items-center justify-end w-full gap-2 my-4">
				<Button variant="outline">Prev</Button>
				<Button variant="outline">Next</Button>
			</div>
		</div>
	);
};

export default Order;
