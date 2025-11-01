import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import cs from "./OrdersListGridColumns.module.scss";
import { capitalize } from "lodash";

export function ordersListGridColumns(): ColumnDef<any>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span className="she-text">{row.original.id}</span>;
      },
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      minSize: 120,
      cell: ({ row }) => {
        return <span className="she-text">{row.original.customerName}</span>;
      },
    },
    {
      accessorKey: "qtyItems",
      header: "Qty Items",
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        return (
          <span className="she-text">{`${row.original.qtyItems} items`}</span>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        return (
          <span className="she-text">{`$${Number(row.original.amount).toFixed(2)}`}</span>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      minSize: 180,
      maxSize: 180,
      cell: ({ row }) => {
        return <span className="she-text">{row.original.paymentMethod}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => {
        const status = row.original.status?.toLowerCase();
        const statusClass =
          status === "completed"
            ? cs.colorGreen
            : status === "in progress"
              ? cs.colorTeal
              : status === "new order"
                ? cs.colorBlue
                : status === "on hold"
                  ? cs.colorOrange
                  : "";

        return (
          <div className={`${cs.statusColor} ${statusClass}`}>
            <span className="she-text">{capitalize(row.original.status)}</span>
          </div>
        );
      },
    },
  ];
}
