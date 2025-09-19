import { ColumnDef, Row } from "@tanstack/react-table";
import { Circle, CircleCheckBig, Trash2 } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./DiscountsListGridColumns.module.scss";

export function DiscountsListGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "select",
      header: "",
      minSize: 70,
      maxSize: 70,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleSelectClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("applyDiscountToOrder", row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              className={row.original.isSelected === true ? cs.iconCheck : ""}
              icon={row.original.isSelected === true ? CircleCheckBig : Circle}
              variant="ghost"
              onClick={handleSelectClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
    {
      id: "discountRate",
      header: "Discount Rate",
      minSize: 150,
      cell: ({ row }) => {
        return <span>{row.original.discountRate}</span>;
      },
    },
    {
      id: "remove",
      header: "Actions",
      minSize: 120,
      maxSize: 120,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("removeDiscount", row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={Trash2}
              value="Remove"
              variant="secondary"
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
