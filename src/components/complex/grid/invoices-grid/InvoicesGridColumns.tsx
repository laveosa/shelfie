import { ColumnDef, Row } from "@tanstack/react-table";
import { Download, Eye, Trash2 } from "lucide-react";
import React from "react";

import placeholderImage from "@/assets/images/placeholder-image.png";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

interface IInvoicesGridColumns {
  id: number | string;
  thumbnailUrl: string;
  height: number;
  width: number;
  isActive: boolean;
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IInvoicesGridColumns>,
  ) => void;
}

export const InvoicesGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IInvoicesGridColumns>,
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "thumbnailUrl",
    header: "File Name",
    size: 180,
    minSize: 180,
    maxSize: 180,
    cell: ({ row, table }) => {
      const photoUrl: string = row.getValue("thumbnailUrl");
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
            src={photoUrl}
            alt="photo"
            className="object-cover rounded-md w-full h-full"
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 180,
    minSize: 180,
    maxSize: 180,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <SheButton
            icon={Eye}
            variant="secondary"
            value="Preview"
            onClick={() =>
              onAction("preview", row.id, meta?.setLoadingRow, row)
            }
          />
          <SheButton
            icon={Download}
            variant="secondary"
            onClick={() =>
              onAction("download", row.id, meta?.setLoadingRow, row)
            }
          />
          <SheButton
            icon={Trash2}
            variant="outline"
            onClick={() => onAction("delete", row.id, meta?.setLoadingRow, row)}
          />
        </div>
      );
    },
  },
];
