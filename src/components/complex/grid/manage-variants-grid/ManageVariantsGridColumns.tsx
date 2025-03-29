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
      const colorOption = row.original.traitOptions.find(
        (option) => option.traitTypeId === 2,
      );
      const sizeOption = row.original.traitOptions.find(
        (option) => option.traitTypeId === 1,
      );

      const color = colorOption ? colorOption.optionColor : null;
      const size = sizeOption ? sizeOption.optionName : null;

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {color && (
            <div
              style={{
                background: color,
                width: "20px",
                height: "20px",
                borderRadius: "10%",
              }}
            />
          )}
          {size && <span>{size}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      return <span>{row.original.stockAmount}</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({}) => {
      return <Switch />;
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
