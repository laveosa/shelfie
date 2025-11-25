import { ColumnDef } from "@tanstack/react-table";
import { Cog, ImageIcon } from "lucide-react";

import cs from "./CartsGridColumns.module.scss";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import React from "react";

export function cartsGridColumns(onAction: any): ColumnDef<any>[] {
  const statusClass = (status: string) => {
    if (status === "New") {
      return cs.cartStatusNew;
    } else if (status === "Expired") {
      return cs.cartStatusExpired;
    } else if (status === "Draft") {
      return cs.cartStatusDraft;
    } else if (status === "Cancelled") {
      return cs.cartStatusCancelled;
    } else if (status === "Purchased") {
      return cs.cartStatusPurchased;
    }
  };
  return [
    {
      accessorKey: "customer",
      header: "Customer",
      minSize: 120,
      cell: ({ row }) => {
        const image: string = row.original.customer.thumbnailUrl;
        const name: string = row.original.customer.customerName;

        return (
          <div className={cs.customerNameBlock}>
            <div>
              {image ? (
                <img
                  src={image}
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
            </div>
            <div>
              <SheTooltip
                delayDuration={200}
                text={name}
                className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span>{name}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Expiration Date",
      minSize: 160,
      maxSize: 160,
      cell: ({ row }) => {
        return <span>{formatDate(row.getValue("date"), "datetime")}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const status: string = row.original.status;
        return (
          <div className={`${cs.cartStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "count",
      header: "Items",
      minSize: 140,
      maxSize: 140,
      cell: ({ row }) => {
        return (
          <div className={cs.itemsCountCell}>
            <span className={cs.itemsCount}>{row.original.count}</span>
            <span>{row.original.prepackedCartStatus}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "value",
      header: "Value",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return (
          <span>{`${row.getValue("value")} ${row.original.currency.briefName}`}</span>
        );
      },
    },
    {
      id: "manage",
      header: "",
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SheButton
              icon={Cog}
              variant="secondary"
              value="Manage"
              onClick={() => onAction("manageCart", row.original.id)}
            />
          </div>
        );
      },
    },
  ];
}
