import { ColumnDef, Row } from "@tanstack/react-table";
import { CogIcon } from "lucide-react";
import React from "react";

import { Switch } from "@/components/ui/switch.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

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
    minSize: 80,
    maxSize: 80,
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
                borderRadius: "50%",
              }}
            />
          ))}
          {sizeOptions.length > 0 && (
            <SheTooltip
              delayDuration={200}
              text={sizeOptions[0].optionName}
              className="max-w-[30px] min-w-[30px] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className={`${cs.traitName} she-text`}>
                {sizeOptions[0].optionName}
              </span>
            </SheTooltip>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    minSize: 90,
    maxSize: 90,
    cell: ({ row }) => {
      return (
        <span style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          {row.original.stockAmount ?? 0}
        </span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    minSize: 80,
    maxSize: 80,
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
    minSize: 120,
    maxSize: 120,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <SheButton
            icon={CogIcon}
            value="Manage"
            variant="secondary"
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
];
