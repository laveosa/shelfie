import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function OrderDiscountsGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "discountRate",
      header: "Applied Discount rate",
      minSize: 150,
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <span className="she-title">{row.original.discountRate}</span>
          </div>
        );
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

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={Trash2}
              value="Remove"
              variant="secondary"
              onClick={() => onAction("removeDiscount", row.original)}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
