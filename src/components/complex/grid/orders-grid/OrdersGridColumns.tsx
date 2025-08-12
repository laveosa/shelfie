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
      size: 30,
      minSize: 30,
      maxSize: 30,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      size: 150,
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => {
        const image: string = row.original.customer.thumbnailUrl;
        // const meta = table.options.meta as {
        //   setLoadingRow: (rowId: string, loading: boolean) => void;
        //   isRowLoading: (rowId: string) => boolean;
        // };

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
                className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
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
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <span>{formatDate(row.getValue("date"), "date")}</span>;
      },
    },
    {
      accessorKey: "channel",
      header: "Channel",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <span>{row.getValue("channel")}</span>;
      },
    },
    {
      accessorKey: "orderStatus",
      header: "Order",
      size: 60,
      minSize: 60,
      maxSize: 60,
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
      size: 60,
      minSize: 60,
      maxSize: 60,
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
      size: 60,
      minSize: 60,
      maxSize: 60,
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
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return <span>{row.getValue("count")}</span>;
      },
    },
    {
      accessorKey: "value",
      header: "Value",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return (
          <span>{`${row.getValue("value")} ${row.original.currency.briefName}`}</span>
        );
      },
    },
    {
      accessorKey: "income",
      header: "Income",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return (
          <span>{`${row.getValue("income")} ${row.original.currency.briefName}`}</span>
        );
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
