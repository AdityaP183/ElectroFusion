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
import { vendorsData } from "@/lib/app-data";
import { AdminVendorsFullColumns } from "@/lib/tableData/AdminColumns";
import { Vendors } from "@/types/component.type";
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

const Vendor = () => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);

	const vendors = useMemo<Vendors[]>(() => vendorsData, []);
	const columns = useMemo<ColumnDef<Vendors>[]>(
		() => AdminVendorsFullColumns,
		[]
	);

	const table = useReactTable({
		data: vendors,
		columns,
		onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            columnVisibility
        }
	});

	console.log("Rendering Vendors...");

	return (
		<div className="w-full p-1">
			<div className="flex items-center justify-between w-full my-4">
				<Searchbar
					searchValue={
						(table
							.getColumn("store_name")
							?.getFilterValue() as string) || ""
					}
					onSearchValueChange={(e) =>
						table.getColumn("store_name")?.setFilterValue(e)
					}
					mainStyle="max-w-[450px]"
					placeholder="Search vendors by store"
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
				<TableWrapper table={table} columnsLength={columns.length} />
			</div>
			<div className="flex items-center justify-end w-full gap-2 my-4">
				<Button variant="outline">Prev</Button>
				<Button variant="outline">Next</Button>
			</div>
		</div>
	);
};

export default Vendor;
