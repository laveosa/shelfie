import { ColumnDef, Row } from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch.tsx";

export const ConnectImageGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "isConnected",
    header: "Active",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <Switch
          disabled={meta?.isRowLoading(row.id)}
          checked={row.getValue("isConnected")}
          onCheckedChange={() =>
            onAction("switchAction", row.id, meta?.setLoadingRow, row)
          }
        />
      );
    },
  },
  {
    accessorKey: "variantName",
    header: "Variant",
    cell: ({ row }) => {
      return <span className="she-text">{row.original.variantName}</span>;
    },
  },
  {
    accessorKey: "traitOptions",
    header: "Traits",
    cell: ({ row }) => {
      const colors = row.original.traitOptions
        .filter((option) => option.traitTypeId === 2)
        .map((option) => option.optionColor)
        .filter((color) => color !== null);

      const sizes = row.original.traitOptions
        .filter((option) => option.traitTypeId === 1)
        .map((option) => option.optionName)
        .filter((size) => size !== null);

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                background: color,
                width: "20px",
                height: "20px",
                borderRadius: "5px",
                display: "inline-block",
                marginRight: "5px",
              }}
            ></div>
          ))}
          {sizes.map((size, index) => (
            <span key={index} style={{ marginRight: "5px" }}>
              {size}
            </span>
          ))}
        </div>
      );
    },
  },
];
