import { ColumnDef } from "@tanstack/react-table";
import { Cog, ImageIcon } from "lucide-react";
import React from "react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import cs from "./OrderShipmentsGridColumns.module.scss";

export function OrderShipmentsGridColumns(onAction: any): ColumnDef<any>[] {
  const statusClass = (status: string) => {
    if (status === "New") {
      return cs.shipmentStatusAvailable;
    } else if (status === "Pending") {
      return cs.shipmentStatusAvailable;
    } else if (status === "Not Available") {
      return cs.shipmentStatusNotAvailable;
    } else {
      return "";
    }
  };

  return [
    {
      accessorKey: "queueDate",
      header: "Action Date",
      minSize: 100,
      cell: ({ row }) => {
        return <span>{formatDate(row.getValue("queueDate"), "date")}</span>;
      },
    },
    {
      id: "shipmentStatus",
      header: "Status",
      minSize: 120,
      cell: ({ row }) => {
        const status: string = row.original.shipmentStatus;
        return (
          <div className={`${cs.shipmentStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "service",
      header: "Service",
      minSize: 100,
      cell: ({ row }) => {
        const image: string = row.original.service;
        return (
          <div>
            {image && (
              <div>
                {image ? (
                  <img
                    src={image}
                    alt={row.original.variantName || "Variant"}
                    className="object-cover rounded-md w-12 h-12"
                  />
                ) : (
                  <SheIcon icon={ImageIcon} maxWidth="30px" />
                )}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "trackingNumber",
      header: "Tracking Number",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span>{row.getValue("trackingNumber")}</span>;
      },
    },
    {
      accessorKey: "quantityPacked",
      header: "Items",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span>{row.original.quantityPacked}</span>;
      },
    },
    {
      id: "manage",
      header: "",
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
              icon={Cog}
              value="Manage"
              variant="secondary"
              onClick={() =>
                onAction(
                  "manageShipment",
                  row.original,
                  row.id,
                  meta?.setLoadingRow,
                )
              }
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
