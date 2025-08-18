import { ImageIcon, PackageMinus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import cs from "@/components/complex/grid/customers-list-grid/CustomersListGridColumns.module.scss";

export function ordersInShipmentGridColumns(onAction: any): ColumnDef<any>[] {
  return [
    {
      accessorKey: "orderId",
      header: "Order Id",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <a>{row.getValue("orderId")}</a>;
      },
    },
    {
      accessorKey: "customer",
      header: "Customer",
      size: 120,
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        const image: string = row.original.customer.thumbnailUrl;
        const name: string = row.original.customer.name;
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SheTooltip
                delayDuration={200}
                text={name}
                className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">{name}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "orderDate",
      header: "Date",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <span>{formatDate(row.getValue("orderDate"), "date")}</span>;
      },
    },
    {
      accessorKey: "unitsAmount",
      header: "Items",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return <span>{row.getValue("unitsAmount")}</span>;
      },
    },
    {
      id: "manage",
      header: "",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SheButton
              icon={PackageMinus}
              variant="secondary"
              value="Remove"
              onClick={() => onAction("removeOrderFromShipment", row.original)}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
