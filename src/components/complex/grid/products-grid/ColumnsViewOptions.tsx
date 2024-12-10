import { ChevronDown, Settings2 } from "lucide-react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

interface IColumnsViewOptions<TData> {
  table: Table<TData>;
}

export function ColumnsViewOptions<TData>({
  table,
}: IColumnsViewOptions<TData>) {
  const handleCheckedChange = (value: boolean, column: any) => {
    column.toggleVisibility(!!value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SheButton variant="outline" icon={Settings2}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Columns
              <ChevronDown style={{ paddingTop: "4px" }} />
            </div>
          </SheButton>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[150px]">
        <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => handleCheckedChange(value, column)}
                onSelect={(event) => {
                  event.preventDefault();
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
