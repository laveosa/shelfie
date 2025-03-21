import { ColumnDef, Row } from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch.tsx";
import ManageVariantsGridColumnActions from "@/components/complex/grid/manage-variants-grid/ManageVariantsGridColumnActions.tsx";

export const ManageVariantsGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "traits",
    header: "Traits",
    cell: ({ row }) => {
      return (
        <>
          <span>{row.original}</span>
          <span></span>
        </>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      return <span>{row.original}</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      return <Switch value={row.original} />;
    },
  },
  {
    id: "rowActions",
    header: "",
    cell: ({ row, table }) => {
      return (
        <ManageVariantsGridColumnActions
          row={row}
          onAction={onAction}
          table={table}
        />
      );
    },
  },
];
