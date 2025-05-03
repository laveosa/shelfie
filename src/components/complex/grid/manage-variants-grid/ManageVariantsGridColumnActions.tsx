import { MoreHorizontal } from "lucide-react";
import { Row, Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

interface VariantGridColumnActionsProps<TData> {
  row?: Row<TData>;
  table?: Table<TData>;
  onAction?: (
    actionType?: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<TData>,
  ) => void;
}

export default function ManageVariantsGridColumnActions<TData>({
  row,
  table,
  onAction,
}: VariantGridColumnActionsProps<TData>) {
  const meta = table.options.meta as {
    setLoadingRow: (rowId: string, loading: boolean) => void;
    isRowLoading: (rowId: string) => boolean;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild style={{ boxShadow: "none" }}>
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
          onClick={() =>
            onAction("manageVariant", row.id, meta?.setLoadingRow, row)
          }
        >
          Manage Variant
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
