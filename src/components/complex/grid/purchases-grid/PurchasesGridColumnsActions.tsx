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
  onAction?: (
    actionType?: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<TData>,
  ) => void;
}

export default function PurchasesGridColumnActions<TData>({
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
          variant="secondary"
          className="flex h-10 w-10 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem
          onClick={() =>
            onAction("deletePurchase", row.id, meta?.setLoadingRow, row)
          }
        >
          Delete purchase
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
