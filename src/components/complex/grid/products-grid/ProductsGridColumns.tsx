import { ColumnDef } from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ProductsGridColumnActions from "@/components/complex/grid/products-grid/ProductsGridColumnActions.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";

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
      case "delete":
        console.log(`Deleting row ${rowId}`);
        break;
    }
    setLoadingRow(rowId, false);
  }, 2000);
}

export const ProductsGridColumns: ColumnDef<ProductModel>[] = [
  {
    accessorKey: "productId",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row, table }) => {
      const image: ImageModel = row.getValue("image");
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
            src={image?.photoUrl || placeholderImage}
            alt={row.getValue("productName")}
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
    accessorKey: "productCode",
    header: "Code",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "productCategory", // Updated accessorKey
    header: "Category",
    cell: ({ row }) => {
      const category: CategoryModel = row.getValue("productCategory");
      return <span>{category?.categoryName || "N/A"}</span>;
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => {
      const brand: BrandModel = row.getValue("brand");
      return <span>{brand?.brandName || "N/A"}</span>;
    },
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
    accessorKey: "stockAmount",
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
  {
    id: "manage",
    header: "",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <SheButton
          onClick={() => onAction("manage", row.id, meta?.setLoadingRow)}
          disabled={meta?.isRowLoading(row.id)}
        >
          Manage
        </SheButton>
      );
    },
  },
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
