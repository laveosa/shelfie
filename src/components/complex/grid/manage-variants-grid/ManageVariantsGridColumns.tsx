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
      const traitOptions = row.original.traitOptions || [];

      const colorOptions = traitOptions.filter(
        (option) => option.traitTypeId === 2 && option.optionColor,
      );
      const sizeOptions = traitOptions.filter(
        (option) => option.traitTypeId === 1 && option.optionName,
      );

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            maxWidth: "50px",
            overflow: "hidden",
          }}
        >
          {colorOptions.map((colorOpt, index) => (
            <div
              key={`color-${index}`}
              style={{
                background: colorOpt.optionColor,
                minWidth: "20px",
                minHeight: "20px",
                borderRadius: "10%",
              }}
            />
          ))}
          {sizeOptions.map((sizeOpt, index) => (
            <span key={`size-${index}`} style={{ fontSize: "0.875rem" }}>
              {sizeOpt.optionName}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      return (
        <span style={{ paddingLeft: "15px" }}>
          {row.original.stockAmount ?? 0}
        </span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      return (
        <Switch
          checked={row.original.isActive}
          onCheckedChange={() => {
            onAction("activateVariant", row.id, undefined, row.original);
          }}
        />
      );
    },
  },
  {
    id: "rowActions",
    header: "Actions",
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
