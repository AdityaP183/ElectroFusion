"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface Props {
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function DateDurationPicker({
    startDate,
    setStartDate,
    endDate,
    setEndDate
}: Props) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: startDate || undefined,
        to: endDate || undefined,
    });

    // Update local state when props change
    React.useEffect(() => {
        setDate({
            from: startDate || undefined,
            to: endDate || undefined,
        });
    }, [startDate, endDate]);

    // Update parent state when local date changes
    const handleDateChange = (newDate: DateRange | undefined) => {
        setDate(newDate);
        setStartDate(newDate?.from || null);
        setEndDate(newDate?.to || null);
    };

    // Clear the date range
    const handleClear = () => {
        setDate(undefined);
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className="grid gap-2">
            <Label className="text-foreground text-sm font-medium">
                Discount Validity
            </Label>
            <div className="flex gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "flex-1 justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={handleDateChange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
                {(date?.from || date?.to) && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleClear}
                        className="shrink-0"
                        title="Clear dates"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
