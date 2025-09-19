import { ColumnDef } from "@tanstack/react-table";
import { Cog, ImageIcon } from "lucide-react";

import cs from "./OrdersGrid.module.scss";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

export function ordersGridColumns(onGridAction: any): ColumnDef<any>[] {
  const statusClass = (status: string) => {
    if (status === "New") {
      return cs.productStatusAvailable;
    } else if (status === "Pending") {
      return cs.productStatusAvailable;
    } else if (status === "Not Available") {
      return cs.productStatusNotAvailable;
    } else {
      return "";
    }
  };
  return [
    {
      accessorKey: "id",
      header: "ID",
      minSize: 50,
      maxSize: 50,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      minSize: 120,
      cell: ({ row }) => {
        const image: string = row.original.customer.thumbnailUrl;

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              {image ? (
                <img
                  src={image}
                  alt={row.original.customer.name}
                  className="object-cover rounded-md w-12 h-12"
                />
              ) : (
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              )}
            </div>
            <div>
              <SheTooltip
                delayDuration={200}
                text={row.original.customer.name}
                className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span>{row.original.customer.name}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      minSize: 100,
      cell: ({ row }) => {
        return <span>{formatDate(row.getValue("date"), "date")}</span>;
      },
    },
    {
      accessorKey: "channel",
      header: "Channel",
      minSize: 100,
      cell: ({ row }) => {
        return <span>{row.getValue("channel")}</span>;
      },
    },
    {
      accessorKey: "orderStatus",
      header: "Order",
      minSize: 100,
      cell: ({ row }) => {
        const status: string = row.getValue("orderStatus");
        return (
          <div className={`${cs.productStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      minSize: 100,
      cell: ({ row }) => {
        const status: string = row.getValue("paymentStatus");
        return (
          <div className={`${cs.productStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "shipmentStatus",
      header: "Shipment",
      minSize: 100,
      cell: ({ row }) => {
        const status: string = row.getValue("shipmentStatus");
        return (
          <div className={`${cs.productStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "count",
      header: "Items",
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.getValue("count")}</span>;
      },
    },
    {
      accessorKey: "value",
      header: "Value",
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        return (
          <span>{`${row.getValue("value")} ${row.original.currency.briefName}`}</span>
        );
      },
    },
    {
      accessorKey: "income",
      header: "Income",
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        return (
          <span>{`${row.getValue("income")} ${row.original.currency.briefName}`}</span>
        );
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

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onGridAction(row.id, meta?.setLoadingRow, row.original);
        };

        return (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SheButton
              icon={Cog}
              variant="secondary"
              value="Manage"
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
