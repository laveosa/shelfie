import { ColumnDef, Row } from "@tanstack/react-table";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";

export const ConnectImageGridColumns = (
  onAction: (
    actionType: string,
    payload: {
      rowId?: string;
      setLoadingRow?: (rowId: string, loading: boolean) => void;
      row?: Row<any>;
    },
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "isActive",
    header: "Status",
    minSize: 80,
    maxSize: 80,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <SheToggle
          disabled={meta?.isRowLoading(row.id)}
          checked={row.getValue("isActive")}
          type={SheToggleTypeEnum.SWITCH}
          onCheckedChange={() => {
            const tmp = onAction; // =============== BUILD TMP FIX
            /*onAction("imageActions", {
              rowId: row.id,
              setLoadingRow: meta?.setLoadingRow,
              row,
            })*/
          }}
        />
      );
    },
  },
  {
    accessorKey: "variantName",
    header: "Variant",
    minSize: 200,
    maxSize: 200,
    cell: ({ row }) => {
      return (
        <SheTooltip
          delayDuration={200}
          text={row.original.variantName}
          className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <span className="she-text">{row.original.variantName}</span>
        </SheTooltip>
      );
    },
  },
  {
    accessorKey: "traitOptions",
    header: "Traits",
    minSize: 80,
    maxSize: 80,
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
                key={index}
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
