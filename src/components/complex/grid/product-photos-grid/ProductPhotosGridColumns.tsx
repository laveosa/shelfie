import { ColumnDef } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import { Switch } from "@/components/ui/switch.tsx";
import ProductsGridColumnActions from "@/components/complex/grid/products-grid/ProductsGridColumnActions.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";

function onAction(
  actionType: string,
  rowId?: string,
  setLoadingRow?: (rowId: string, loading: boolean) => void,
) {
  setLoadingRow(rowId, true);
  setTimeout(() => {
    switch (actionType) {
      case "image":
        console.log(`Image row ${rowId}`);
        break;
      case "manage":
        console.log(`Managing row ${rowId}`);
        break;
      case "active":
        console.log(`Active row ${rowId}`);
        break;
      case "edit":
        console.log(`Editing row ${rowId}`);
        break;
      case "copy":
        console.log(`Copying row ${rowId}`);
        break;
      case "favorite":
        console.log(`Favoriting row ${rowId}`);
        break;
      case "delete":
        console.log(`Deleting row ${rowId}`);
        break;
    }
    setLoadingRow(rowId, false);
  }, 2000);
}

export const ProductPhotosGridColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: () => {
      return (
        <div>
          <GripVertical />
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row, table }) => {
      const photoUrl: ImageModel = row.getValue("image");
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
            src={photoUrl.thumbnailUrl}
            alt={row.getValue("id")}
            className="object-cover rounded-md w-full h-full"
            onError={(e) => {
              e.currentTarget.src =
                "https://ircsan.com/wp-content/uploads/2024/03/placeholder-image.png";
            }}
          />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "format",
  //   header: "Format",
  // },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <Switch
          disabled={meta?.isRowLoading(row.id)}
          checked={row.getValue("active")}
          onCheckedChange={() =>
            onAction("active", row.id, meta?.setLoadingRow)
          }
        />
      );
    },
  },
  // {
  //   accessorKey: "variants",
  //   header: "Variants",
  // },
  {
    id: "rowActions",
    header: "",
    cell: ({ row, table }) => {
      return (
        <ProductsGridColumnActions
          row={row}
          onAction={onAction}
          table={table}
        />
      );
    },
  },
];
