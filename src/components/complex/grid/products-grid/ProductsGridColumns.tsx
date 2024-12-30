import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { MoreHorizontal } from "lucide-react";
import { ProductsModel } from "@/const/models/ProductsModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

function onAction(
  actionType: string,
  rowId: string,
  setLoadingRow: (rowId: string, loading: boolean) => void,
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

export const ProductsGridColumns: ColumnDef<ProductsModel>[] = [
  {
    accessorKey: "id",
    header: "ID",
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

      const handleManageClick = () => {
        onAction("image", row.id, meta?.setLoadingRow);
      };
      return (
        <div
          className="relative w-12 h-12 cursor-pointer"
          onClick={handleManageClick}
        >
          <img
            src={photoUrl.photoUrl}
            alt={row.getValue("productName")}
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
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          style={{
            border: "1px solid #38BF5E",
            borderRadius: "8px",
            background: "#EBF9EF",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "#38BF5E",
            }}
          >
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
    cell: ({ row }) => {
      return <span>{`${row.getValue("salePrice")}zł`}</span>;
    },
  },
  {
    accessorKey: "variantCount",
    header: "Variants",
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      return <span>{`${row.getValue("stock")} units`}</span>;
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      const isLoading = meta?.isRowLoading(row.id);

      const handleManageClick = () => {
        onAction("active", row.id, meta?.setLoadingRow);
      };
      return (
        <Switch
          disabled={isLoading}
          checked={row.getValue("active")}
          onCheckedChange={handleManageClick}
        />
      );
    },
  },
  {
    id: "manage",
    header: "",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      const isLoading = meta?.isRowLoading(row.id);

      const handleManageClick = () => {
        onAction("manage", row.id, meta?.setLoadingRow);
      };

      return (
        <SheButton onClick={handleManageClick} disabled={isLoading}>
          {isLoading ? "Loading..." : "Manage"}
        </SheButton>
      );
    },
  },
  {
    id: "rowActions",
    header: "",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      const isLoading = meta?.isRowLoading(row.id);

      const handleAction = (
        actionType: "edit" | "copy" | "favorite" | "delete",
      ) => {
        onAction(actionType, row.id, meta?.setLoadingRow);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SheButton
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              disabled={isLoading}
            >
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </SheButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[160px]">
            <DropdownMenuItem onClick={() => handleAction("edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("copy")}>
              Make a copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("favorite")}>
              Favorite
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction("delete")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
