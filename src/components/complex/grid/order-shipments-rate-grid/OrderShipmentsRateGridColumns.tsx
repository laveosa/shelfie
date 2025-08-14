import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function OrderShipmentsRateGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "shipmentRate",
      header: "Shipment Rate",
      size: 150,
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <span className="she-title">{row.getValue("shipmentRate")}</span>
          </div>
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
              icon={Trash2}
              value="Remove"
              variant="secondary"
              onClick={() => onAction("removeShipment", row.original)}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
