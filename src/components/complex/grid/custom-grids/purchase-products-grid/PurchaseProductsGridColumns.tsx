import { ColumnDef } from "@tanstack/react-table";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import cs from "./PurchaseProductsGridColumns.module.scss";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import PurchaseProductsForm from "@/components/forms/purchase-products-form/PurchaseProductsForm.tsx";
import { ImageIcon } from "lucide-react";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import PurchaseProductsGridColumnActions from "@/components/complex/grid/custom-grids/purchase-products-grid/PurchaseProductsGridColumnActions.tsx";
import { convertToSelectItems } from "@/utils/converters/primitive-components/she-select-convertors.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

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
      minSize: 56,
      maxSize: 56,
      cell: ({ row, table }) => {
        const image: ImageModel = row.getValue("photo");

        return (
          <SheIcon
            icon={image?.thumbnailUrl || ImageIcon}
            className="m-auto"
            style={{
              ...(!image?.thumbnailUrl && {
                padding: "10px",
              }),
            }}
            color="#64748b"
            iconView={IconViewEnum.BUTTON}
          />
        );
      },
    },
    {
      accessorKey: "variantCode",
      header: "Code",
      minSize: 60,
      maxSize: 60,
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
      minSize: 150,
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
              {/*<span>{brand?.brandName || "N/A"}</span>*/}
            </div>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "traitOptions",
      header: "Details",
      minSize: 60,
      maxSize: 150,
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
      accessorKey: "",
      minSize: 500,
      maxSize: 500,
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
            taxes={convertToSelectItems(taxes, {
              text: "name",
              value: "id",
            })}
            currencies={convertToSelectItems(currencies, {
              text: "briefName",
              value: "id",
            })}
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
      minSize: 50,
      maxSize: 50,
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
