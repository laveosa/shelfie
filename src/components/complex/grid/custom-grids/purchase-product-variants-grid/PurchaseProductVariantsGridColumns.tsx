import { Cog, Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function PurchaseProductVariantsGridColumns(
  onAction: any,
): ColumnDef<any>[] {
  return [
    {
      id: "add",
      header: "Add",
      minSize: 100,
      maxSize: 100,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("addRow", row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={Plus}
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "traitOptions",
      header: "Details",
      minSize: 260,
      maxSize: 260,
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
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              verticalAlign: "middle",
            }}
          >
            {colorOptions.map((colorOpt, index) => (
              <div
                key={`color-${index}`}
                style={{
                  background: colorOpt.optionColor,
                  minWidth: "20px",
                  minHeight: "20px",
                  borderRadius: "50%",
                  border: "2px solid #ccc",
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
      id: "rowActions",
      header: "Actions",
      minSize: 175,
      maxSize: 175,
      cell: ({ row }) => {
        return (
          <SheButton
            icon={Cog}
            value={"Manage Variant"}
            variant="secondary"
            onClick={() => onAction("manageVariant", row.original)}
          />
        );
      },
    },
  ];
}
