// columns.ts
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type Order = {
	id: string;
	customerName: string;
	purchasedPrice: number;
	orderStatus: string;
	orderedOn: string;
	deliveryOn: string | null;
};

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

export const allOrdersColumn: ColumnDef<Order>[] = [
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
