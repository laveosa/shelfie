import { ColumnDef } from "@tanstack/react-table";
import { Cog, ImageIcon } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export function OrderShipmentsGridColumns(onAction: any): ColumnDef<any>[] {
  return [
    {
      accessorKey: "actionDate",
      header: "Action Date",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.getValue("actionDate")}</span>;
      },
    },
    {
      id: "status",
      header: "Status",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <span>{row.getValue("status")}</span>;
      },
    },
    {
      accessorKey: "service",
      header: "Service",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        const image: string = row.original.photo;
        return (
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
        );
      },
    },
    {
      accessorKey: "trackingNumber",
      header: "Tracking Number",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span>{row.getValue("documentNotes")}</span>;
      },
    },
    {
      accessorKey: "items",
      header: "Items",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        <span>{row.getValue("items")}</span>;
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
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={Cog}
              value="Manage"
              onClick={onAction(
                "manageShipment",
                row.id,
                meta?.setLoadingRow,
                row.original,
              )}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
