import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Switch } from "@/components/ui/switch.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

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
            maxWidth: "60px",
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
            <span
              key={`size-${index}`}
              style={{
                fontSize: "0.875rem",
                maxWidth: "20px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
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
          onCheckedChange={() =>
            onAction("activateVariant", row.id, undefined, row)
          }
        />
      );
    },
  },
  {
    id: "manage",
    header: "Actions",
    minSize: 100,
    maxSize: 100,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <SheButton
            value="Manage"
            onClick={() =>
              onAction(
                "manageVariant",
                row.id,
                meta?.setLoadingRow,
                row.original,
              )
            }
            disabled={meta?.isRowLoading(row.id)}
          />
        </div>
      );
    },
  },
  {
    id: "delete",
    header: "",
    minSize: 60,
    maxSize: 60,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <SheButton
            icon={Trash2}
            variant="secondary"
            onClick={() =>
              onAction(
                "deleteVariant",
                row.id,
                meta?.setLoadingRow,
                row.original,
              )
            }
            disabled={meta?.isRowLoading(row.id)}
          />
        </div>
      );
    },
  },
];
