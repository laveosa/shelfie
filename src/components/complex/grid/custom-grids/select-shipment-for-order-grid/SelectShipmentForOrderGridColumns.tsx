import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon, Truck } from "lucide-react";
import React from "react";

import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cs from "./SelectShipmentForOrderGrdColumns.module.scss";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function SelectShipmentForOrderGridColumns(
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
      id: "queueDate",
      header: "Queue Date",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span>{formatDate(row.original.queueDate, "date")}</span>;
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
      id: "deliveryAddress",
      header: "Address",
      minSize: 100,
      cell: ({ row }) => {
        const alias: string = row.original.deliveryAddress?.alias;
        const address: string = row.original.deliveryAddress?.addressLine1;
        const city: string = row.original.deliveryAddress?.city;
        return (
          <div className={cs.deliveryAddress}>
            <span className={`${cs.alias} she-text`}>{alias}</span>
            <span className={`${cs.address} she-text`}>{address}</span>
            <span className={`${cs.address} she-text`}>{city}</span>
          </div>
        );
      },
    },
    {
      id: "quantityPacked",
      header: "Qty Packed",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span>{row.original.quantityPacked}</span>;
      },
    },
    {
      id: "select",
      header: "",
      minSize: 110,
      maxSize: 110,
      cell: ({ row }) => {
        return (
          <div className={cs.selectButton} onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={Truck}
              value="Select"
              variant="secondary"
              onClick={() => onAction("connectShipmentToOrder", row.original)}
            />
          </div>
        );
      },
    },
  ];
}
