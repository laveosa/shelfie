import { ColumnDef, Row } from "@tanstack/react-table";
import { ImageIcon, Plus } from "lucide-react";

import cs from "./FindProductGridColumns.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import FindProductColumnActions from "@/components/complex/grid/custom-grids/find-product-grid/FindProductColumnActions.tsx";
import QuantityInputCell from "@/components/complex/grid/custom-grids/find-product-grid/QuantityInputCell.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export function findProductGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>, quantity?: string) => void;
}): ColumnDef<any>[] {
  return [
    {
      accessorKey: "variantCode",
      header: "Code",
      minSize: 70,
      maxSize: 70,
      cell: ({ row }) => {
        return (
          <SheTooltip delayDuration={200} text={row.getValue("variantCode")}>
            <span className={cs.variantCode}>
              {row.getValue("variantCode")}
            </span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "photo",
      header: "Image",
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        const image: ImageModel = row.getValue("photo");
        return (
          <div className={cs.productNameImageBlock}>
            {image ? (
              <img
                src={image?.thumbnailUrl}
                alt={row.getValue("variantName")}
                className={cs.productNameImage}
              />
            ) : (
              <SheIcon icon={ImageIcon} maxWidth="30px" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "variantName",
      header: "Product Name",
      minSize: 150,
      cell: ({ row }) => {
        return (
          <SheTooltip delayDuration={200} text={row.getValue("variantName")}>
            <span className={cs.variantName}>
              {row.getValue("variantName")}
            </span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "productCategory",
      header: "Category",
      minSize: 100,
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
      minSize: 100,
      cell: ({ row }) => {
        const brand: BrandModel = row.getValue("brand");
        return (
          <SheTooltip delayDuration={200} text={brand?.brandName || "N/A"}>
            <div className={cs.productCategory}>
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
      accessorKey: "traitOptions",
      header: "Details",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const traitOptions = row.original.traitOptions || [];

        const colorOptions = traitOptions.filter(
          (option) => option.traitTypeId === 2 && option.optionColor,
        );
        const sizeOptions = traitOptions.filter(
          (option) => option.traitTypeId === 1 && option.optionName,
        );

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxWidth: "50px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              verticalAlign: "middle",
            }}
          >
            {colorOptions.map((colorOpt, index) => (
              <div
                key={`color-${index}`}
                style={{
                  background: colorOpt.optionColor,
                  minWidth: "20px",
                  minHeight: "20px",
                  borderRadius: "50%",
                  border: "2px solid #ccc",
                }}
              />
            ))}
            {sizeOptions.map((sizeOpt, index) => (
              <span key={`size-${index}`} style={{ fontSize: "0.875rem" }}>
                {sizeOpt.optionName}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "stockAmount",
      header: "In Stock",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span>{`${row.getValue("stockAmount")} units`}</span>;
      },
    },
    {
      accessorKey: "salePrice",
      header: "Price",
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        const price: string = row.getValue("salePrice");
        return <span>{price ? price : "N/A"}</span>;
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => <QuantityInputCell row={row} />,
    },
    {
      id: "add",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={Plus}
              value="Add"
              variant="secondary"
              onClick={() => onAction("addVariantToOrder", row.original)}
              // disabled={
              //   row.original.amount === 0 ||
              //   row.original.amount > row.original.stockAmount
              // }
            />
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
        return (
          <FindProductColumnActions
            row={row}
            onAction={onAction}
            table={table}
          />
        );
      },
    },
  ];
}
