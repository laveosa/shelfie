import React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ListTree, Trash2 } from "lucide-react";

import { Switch } from "@/components/ui/switch.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

interface IProductPhotoGridColumns {
  id: number | string;
  thumbnailUrl: string;
  height: number;
  width: number;
  isActive: boolean;
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IProductPhotoGridColumns>,
  ) => void;
}

export const ProductPhotosGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IProductPhotoGridColumns>,
  ) => void,
): ColumnDef<IProductPhotoGridColumns>[] => [
  {
    accessorKey: "thumbnailUrl",
    header: "Preview",
    minSize: 80,
    maxSize: 80,
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
    accessorKey: "format",
    header: "Format",
    minSize: 150,
    maxSize: 150,
    cell: ({ row }) => {
      return (
        <span className="she-subtext">{`${row.original.height}px x ${row.original.width}px`}</span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    minSize: 60,
    maxSize: 60,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <Switch
          disabled={meta?.isRowLoading(row.id)}
          checked={row.getValue("isActive")}
          onCheckedChange={() =>
            onAction("activate", row.id, meta?.setLoadingRow, row)
          }
        />
      );
    },
  },
  {
    id: "map",
    header: "Actions",
    minSize: 100,
    maxSize: 100,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <SheButton
          icon={ListTree}
          value="Map"
          variant="secondary"
          onClick={() => onAction("connect", row.id, meta?.setLoadingRow, row)}
        />
      );
    },
  },
  {
    id: "delete",
    minSize: 60,
    maxSize: 60,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <SheButton
          icon={Trash2}
          variant="outline"
          onClick={() => onAction("delete", row.id, meta?.setLoadingRow, row)}
        />
      );
    },
  },
];
