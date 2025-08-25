import { ColumnDef } from "@tanstack/react-table";
import { ImageModel } from "@/const/models/ImageModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import cs from "./PurchaseProductsGridColumns.module.scss";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import PurchaseProductsForm from "@/components/forms/purchase-products-form/PurchaseProductsForm.tsx";
import { ImageIcon } from "lucide-react";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import PurchaseProductsGridColumnActions from "@/components/complex/grid/purchase-products-grid/PurchaseProductsGridColumnActions.tsx";

export function purchaseProductsGridColumns(
  currencies: CurrencyModel[],
  taxes: TaxTypeModel[],
  activeTab: string,
  onAction: any,
): ColumnDef<any>[] {
  return [
    {
      accessorKey: "photo",
      header: "Image",
      size: 50,
      minSize: 50,
      cell: ({ row, table }) => {
        const image: ImageModel = row.getValue("photo");
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        return (
          <div
            className="relative w-12 h-12 cursor-pointer"
            onClick={() => onAction("image", row.id, meta?.setLoadingRow)}
          >
            {image ? (
              <img
                src={image?.thumbnailUrl || placeholderImage}
                alt={row.getValue("variantName")}
                className="object-cover rounded-md w-full h-full"
              />
            ) : (
              <SheIcon
                icon={ImageIcon}
                maxWidth="30px"
                className={cs.noImageIcon}
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "variantCode",
      header: "Code",
      size: 70,
      minSize: 70,
      cell: ({ row }) => {
        return (
          <SheTooltip delayDuration={200} text={row.getValue("variantCode")}>
            <span className={cs.productCode}>
              {row.getValue("variantCode")}
            </span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "variantName",
      header: "Product Name",
      size: 70,
      minSize: 70,
      cell: ({ row }) => {
        return (
          <SheTooltip delayDuration={200} text={row.getValue("variantName")}>
            <span className={cs.productName}>
              {row.getValue("variantName")}
            </span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "productCategory",
      header: "Category",
      size: 70,
      minSize: 70,
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
      size: 60,
      minSize: 60,
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
      accessorKey: "traitOptions",
      header: "Details",
      size: 60,
      minSize: 60,
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
                  border: "1px solid #ccc",
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
      accessorKey: "",
      size: 260,
      minSize: 260,
      maxSize: 260,
      header:
        activeTab === "connectProducts"
          ? "Quantity to add"
          : "Quantity in purchase",
      cell: ({ row }) => {
        const stockActionId = row.original.stockActionId;
        const data = {
          unitsAmount: row.original.unitsAmount,
          currencyId: Number(row.original.stockDocumentPrice.currencyId),
          taxTypeId: Number(row.original.stockDocumentPrice.taxTypeId),
          nettoPrice: row.original.stockDocumentPrice.netto,
        };
        return (
          <PurchaseProductsForm
            activeTab={activeTab}
            taxes={taxes}
            currencies={currencies}
            data={data}
            onSubmit={(data) => {
              onAction("updatePurchaseProduct", { data, stockActionId });
            }}
          />
        );
      },
    },
    {
      id: "rowActions",
      header: "",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row, table }) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PurchaseProductsGridColumnActions
              row={row}
              onAction={onAction}
              table={table}
            />
          </div>
        );
      },
    },
  ];
}
