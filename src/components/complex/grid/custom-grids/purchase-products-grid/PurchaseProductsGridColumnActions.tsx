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
  row?: Row<TData>;
  table?: Table<TData>;
  onAction?: (actionType?: string, row?: Row<TData>) => void;
}

export default function PurchaseProductsGridColumnActions<TData>({
  row,
  table,
  onAction,
}: ProductsGridColumnActionsProps<TData>) {
  const meta = table.options.meta as {
    setLoadingRow: (rowId: string, loading: boolean) => void;
    isRowLoading: (rowId: string) => boolean;
  };
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
        <DropdownMenuItem onClick={() => onAction("addVariant", row)}>
          Add additional variants
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("manageVariant", row)}>
          Manage variant
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("transferToPurchase", row)}>
          Transfer to purchase
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("removeFromStock", row)}>
          Remove from stock
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("stockChangeHistory", row)}>
          Stock change history
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
