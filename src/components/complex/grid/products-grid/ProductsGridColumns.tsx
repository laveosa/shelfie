import { ColumnDef } from "@tanstack/react-table";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ProductsGridColumnActions from "@/components/complex/grid/products-grid/ProductsGridColumnActions.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { Switch } from "@/components/ui/switch.tsx";
import cs from "./ProductsGridColumns.module.scss";

export function productsGridColumns(
  onAction: any,
  activeStates?: Record<string, boolean>,
): ColumnDef<any>[] {
  return [
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
              src={image?.thumbnailUrl || placeholderImage}
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
      accessorKey: "productCategory",
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
        const status: string = row.getValue("status");

        const statusClass = (status: string) => {
          if (status === "Available") {
            return cs.productStatusAvailable;
          } else if (status === "Not Available") {
            return cs.productStatusNotAvailable;
          } else {
            return "";
          }
        };

        return (
          <div className={`${cs.productStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "salePrice",
      header: "Sale Price",
      cell: ({ row }) => {
        const price: string = row.getValue("salePrice");
        return <span>{price ? price : "N/A"}</span>;
      },
    },
    {
      accessorKey: "variantsCount",
      header: "Variants",
      cell: ({ row }) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span>{row.getValue("variantsCount")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "stockAmount",
      header: "Stock",
      cell: ({ row }) => {
        return <span>{`${row.getValue("stockAmount")} units`}</span>;
      },
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const rowId = row.id;
        const isChecked =
          activeStates && rowId in activeStates
            ? activeStates[rowId]
            : row.original.isActive;

        return (
          <Switch
            disabled={meta?.isRowLoading(rowId)}
            checked={isChecked}
            onCheckedChange={() =>
              onAction(
                "activateProduct",
                rowId,
                meta?.setLoadingRow,
                row.original,
                row.original,
              )
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

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("manage", row.id, meta?.setLoadingRow, row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            >
              Manage
            </SheButton>
          </div>
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
}
