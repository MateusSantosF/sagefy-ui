"use client";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/components/ui/popover";
import { Button } from "@shared/components/ui/button";
import { Calendar } from "@shared/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
}: DateRangePickerProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full md:w-[300px] justify-start text-left font-normal rounded-xl border-2 h-11",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL yyyy")} -{" "}
                  {format(dateRange.to, "LLL yyyy", { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, "LLL yyyy", { locale: ptBR })
              )
            ) : (
              <span>Filtrar por data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            locale={ptBR}
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              if (range) {
                onDateRangeChange(range);
              }
            }}
            numberOfMonths={2}
          />
          <div className="flex items-center justify-end p-3 border-t border-border">
            <Button
              variant="ghost"
              onClick={() =>
                onDateRangeChange({ from: undefined, to: undefined })
              }
            >
              Limpar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
