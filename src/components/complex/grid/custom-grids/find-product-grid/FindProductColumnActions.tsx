import { MoreHorizontal } from "lucide-react";
import { Row, Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

interface ProductsGridColumnActionsProps<TData> {
  row?: any;
  table?: Table<TData>;
  onAction?: (actionType?: string, row?: Row<TData>) => void;
}

export default function FindProductColumnActions<TData>({
  row,
  onAction,
}: ProductsGridColumnActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SheButton
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => onAction("manageProduct", row.original)}
        >
          Manage product
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onAction("manageVariant", row.original)}
        >
          Manage variant
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onAction("openAddStockCard", row.original)}
        >
          Add to stock
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
