import { ColumnDef } from "@tanstack/react-table";
import { Cog, ImageIcon } from "lucide-react";
import React from "react";

import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cs from "./ShipmentsListGridColumns.module.scss";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function ShipmentsListGridColumns(onAction: any): ColumnDef<any>[] {
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
      id: "shipmentId",
      header: "ID",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return <span>{row.original.shipmentId}</span>;
      },
    },
    {
      id: "customer",
      accessorFn: (row) => row.variantName,
      header: "customer",
      size: 120,
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        const imageUrl: string = row.original.customer?.thumbnailUrl;
        const name: string = row.original.customer?.name;
        return (
          <div className={cs.customerNameBlock}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name || "Customer"}
                className="object-cover rounded-md w-full h-full"
                style={{ width: "48px", height: "48px" }}
              />
            ) : name ? (
              <div className={cs.avatarInitials}>{getInitials(name)}</div>
            ) : (
              <div className={cs.noImageIcon}>
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              </div>
            )}
            <SheTooltip
              delayDuration={200}
              text={name}
              className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className="she-text">{name}</span>
            </SheTooltip>
          </div>
        );
      },
    },
    {
      id: "createdAt",
      header: "Date",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{formatDate(row.original.createdAt, "date")}</span>;
      },
    },
    {
      id: "service",
      header: "Service",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.original.service}</span>;
      },
    },
    {
      id: "number",
      header: "Number",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.original.number}</span>;
      },
    },
    {
      id: "shipmentStatus",
      header: "Status",
      size: 60,
      minSize: 60,
      maxSize: 60,
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
      id: "quantityPacked",
      header: "Qty Packed",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.original.quantityPacked}</span>;
      },
    },
    {
      id: "weight",
      header: "Weight",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.original.weight}</span>;
      },
    },
    {
      id: "manage",
      header: "",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return (
          <div className={cs.selectButton} onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={Cog}
              value="Manage"
              variant="secondary"
              onClick={() => onAction("manageShipment", row.original)}
            />
          </div>
        );
      },
    },
  ];
}
