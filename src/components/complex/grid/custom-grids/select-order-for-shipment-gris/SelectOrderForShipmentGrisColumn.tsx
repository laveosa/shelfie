import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon, PackagePlus } from "lucide-react";
import React from "react";

import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cs from "./OrderForShipmentGridColumns.module.scss";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function SelectOrderForShipmentGridColumns(
  onAction: any,
): ColumnDef<any>[] {
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
      id: "id",
      header: "ID",
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <span>{row.original.id}</span>;
      },
    },
    {
      id: "customer",
      accessorFn: (row) => row.variantName,
      header: "customer",
      minSize: 120,
      cell: ({ row }) => {
        const imageUrl: string = row.original.customer?.thumbnailUrl;
        const name: string = row.original.customer?.customerName;
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
              className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className="she-text">{name}</span>
            </SheTooltip>
          </div>
        );
      },
    },

    {
      id: "date",
      header: "Date",
      minSize: 90,
      maxSize: 90,
      cell: ({ row }) => {
        return <span>{formatDate(row.original.date, "date")}</span>;
      },
    },
    {
      id: "orderStatus",
      header: "Order",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const status: string = row.original.orderStatus;
        return (
          <div className={`${cs.shipmentStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      id: "paymentStatus",
      header: "Payment",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const status: string = row.original.paymentStatus;
        return (
          <div className={`${cs.shipmentStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      id: "shipmentStatus",
      header: "Status",
      minSize: 100,
      maxSize: 100,
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
      id: "value",
      header: "Value",
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        const currensy: string = row.original.currency.briefName;
        return (
          <span className="she-text">{`${row.original.value}${currensy}`}</span>
        );
      },
    },
    {
      id: "add",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return (
          <div className={cs.selectButton} onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={PackagePlus}
              value="Add"
              variant="secondary"
              onClick={() => onAction("connectOrderToShipment", row.original)}
            />
          </div>
        );
      },
    },
  ];
}
