import { ColumnDef, Row } from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

export const ConnectImageGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "isActive",
    header: "Status",
    size: 60,
    maxSize: 60,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <Switch
          disabled={meta?.isRowLoading(row.id)}
          checked={row.getValue("isActive")}
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
      return (
        <SheTooltip
          delayDuration={200}
          text={row.original.variantName}
          className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <span className="she-text">{row.original.variantName}</span>
        </SheTooltip>
      );
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
          <div style={{ display: "flex", gap: "5px" }}>
            {sizes.map((size, index) => (
              <SheTooltip
                delayDuration={200}
                text={size}
                className="max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span key={index} className="she-text">
                  {size}
                </span>
              </SheTooltip>
            ))}
          </div>
        </div>
      );
    },
  },
];
