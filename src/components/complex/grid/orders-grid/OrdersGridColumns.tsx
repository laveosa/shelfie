import { ColumnDef } from "@tanstack/react-table";

import cs from "./OrdersGrid.module.scss";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function ordersGridColumns(onAction: any): ColumnDef<any>[] {
  const statusClass = (status: string) => {
    if (status === "Available") {
      return cs.productStatusAvailable;
    } else if (status === "Not Available") {
      return cs.productStatusNotAvailable;
    } else {
      return "";
    }
  };
  return [
    {
      accessorKey: "customerId",
      header: "ID",
      size: 30,
      minSize: 30,
      maxSize: 30,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row, table }) => {
        const image: string = row.getValue("customer.thumbnailUrl");
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        return (
          <div
            className="relative w-12 h-12 cursor-pointer"
            onClick={() => onAction("image", row.id, meta?.setLoadingRow)}
          >
            <img
              src={image || placeholderImage}
              alt={row.getValue("customer.name")}
              className="object-cover rounded-md w-full h-full"
              onError={(e) => {
                e.currentTarget.src = placeholderImage;
              }}
            />
            <span>{row.getValue("customer.name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return <span>{formatDate("date", row.getValue("date"))}</span>;
      },
    },
    {
      accessorKey: "chanel",
      header: "Chanel",
      size: 30,
      minSize: 30,
      maxSize: 30,
      cell: ({ row }) => {
        return <span>{row.getValue("chanel")}</span>;
      },
    },
    {
      accessorKey: "orderStatus",
      header: "Order",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        const status: string = row.getValue("status");
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
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        const status: string = row.getValue("status");
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
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        const status: string = row.getValue("status");
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
      size: 30,
      minSize: 30,
      maxSize: 30,
      cell: ({ row }) => {
        return <span>{row.getValue("count")}</span>;
      },
    },
    {
      accessorKey: "value",
      header: "Value",
      size: 30,
      minSize: 30,
      maxSize: 30,
      cell: ({ row }) => {
        return (
          <span>{`${row.getValue("value")} ${row.getValue("currency.briefName")}`}</span>
        );
      },
    },
    {
      accessorKey: "income",
      header: "Income",
      size: 30,
      minSize: 30,
      maxSize: 30,
      cell: ({ row }) => {
        return (
          <span>{`${row.getValue("income")} ${row.getValue("currency.briefName")}`}</span>
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
          onAction("manageOrder", row.id, meta?.setLoadingRow, row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
              value="Manage"
            />
          </div>
        );
      },
    },
  ];
}
