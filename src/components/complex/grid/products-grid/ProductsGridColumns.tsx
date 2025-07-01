import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { Switch } from "@/components/ui/switch.tsx";
import cs from "./ProductsGridColumns.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

export function productsGridColumns(
  onAction: any,
  onDelete: (data) => void,
  activeStates?: Record<string, boolean>,
): ColumnDef<any>[] {
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
      accessorKey: "productId",
      header: "ID",
      minSize: 60,
    },
    {
      accessorKey: "image",
      header: "Image",
      minSize: 60,
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
      cell: ({ row }) => {
        return (
          <SheTooltip delayDuration={200} text={row.getValue("productCode")}>
            <span className={cs.productCode}>
              {row.getValue("productCode")}
            </span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      minSize: 150,
      cell: ({ row }) => {
        return (
          <SheTooltip delayDuration={200} text={row.getValue("productName")}>
            <span className={cs.productName}>
              {row.getValue("productName")}
            </span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "productCategory",
      header: "Category",
      minSize: 150,
      cell: ({ row }) => {
        const category: CategoryModel = row.getValue("productCategory");
        return (
          <SheTooltip
            delayDuration={200}
            text={category?.categoryName || "N/A"}
          >
            <div className={cs.productCategory}>
              {row.original.productCategory?.thumbnail && (
                <img
                  src={row.original.productCategory?.thumbnail}
                  alt={row.original.productCategory.categoryName}
                />
              )}
              <span>{category?.categoryName || "N/A"}</span>
            </div>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
      minSize: 150,
      cell: ({ row }) => {
        const brand: BrandModel = row.getValue("brand");
        return (
          <SheTooltip delayDuration={200} text={brand?.brandName || "N/A"}>
            <div className={cs.productBrand}>
              {row.original.brand?.thumbnail && (
                <img
                  src={row.original.brand?.thumbnail}
                  alt={row.original.brand.brandName}
                />
              )}
              <span>{brand?.brandName || "N/A"}</span>
            </div>
          </SheTooltip>
        );
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
      minSize: 100,
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
          <div>
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
          onAction("manageProduct", row.id, meta?.setLoadingRow, row.original);
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
      minSize: 70,
      maxSize: 70,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };
        const rowId = row.original.id;
        const handleDeleteClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete({ table, rowId, row });
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={TrashIcon}
              variant="secondary"
              onClick={handleDeleteClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
    // {
    //   id: "rowActions",
    //   header: "",
    //   minSize: 70,
    //   maxSize: 70,
    //   cell: ({ row, table }) => {
    //     return (
    //       <div style={{ display: "flex", justifyContent: "center" }}>
    //         <ProductsGridColumnActions
    //           row={row}
    //           onAction={onAction}
    //           table={table}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];
}
