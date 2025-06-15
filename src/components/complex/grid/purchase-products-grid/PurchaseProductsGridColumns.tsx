import { ColumnDef } from "@tanstack/react-table";
import ProductsGridColumnActions from "@/components/complex/grid/products-grid/ProductsGridColumnActions.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import cs from "./PurchasePrductsGridColumns.module.scss";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import PurchaseProductsForm from "@/components/forms/purchase-products-form/PurchaseProductsForm.tsx";

export function purchaseProductsGridColumns(
  currencies: CurrencyModel[],
  taxes: TaxTypeModel[],
  activeTab: string,
  onAction: any,
): ColumnDef<any>[] {
  return [
    {
      accessorKey: "image",
      header: "Image",
      size: 40,
      minSize: 40,
      maxSize: 40,
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
      size: 40,
      minSize: 40,
      maxSize: 40,
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
      size: 70,
      minSize: 70,
      maxSize: 70,
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
      size: 50,
      minSize: 50,
      maxSize: 50,
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
      size: 50,
      minSize: 50,
      maxSize: 50,
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
      accessorKey: "",
      header: "Details",
      size: 50,
      minSize: 50,
      maxSize: 50,
      cell: ({}) => {
        return <span>{""}</span>;
      },
    },
    {
      accessorKey: "",
      size: 200,
      minSize: 200,
      maxSize: 200,
      header:
        activeTab === "connectProducts"
          ? "Quantity to add"
          : "Quantity in purchase",
      cell: ({}) => {
        return (
          <PurchaseProductsForm
            activeTab={activeTab}
            taxes={taxes}
            currencies={currencies}
            onSubmit={(data) => {
              console.log("DATA", data);
              onAction("addProductToPurchase", data);
            }}
          />
        );
      },
    },
    // {
    //   id: "manage",
    //   header: "",
    //   minSize: 100,
    //   maxSize: 100,
    //   cell: ({ row, table }) => {
    //     const meta = table.options.meta as {
    //       setLoadingRow: (rowId: string, loading: boolean) => void;
    //       isRowLoading: (rowId: string) => boolean;
    //     };
    //
    //     const handleManageClick = (e) => {
    //       e.stopPropagation();
    //       e.preventDefault();
    //       activeTab === "connectProducts"
    //         ? onAction("add", row.id, meta?.setLoadingRow, row.original)
    //         : onAction("update", row.id, meta?.setLoadingRow, row.original);
    //     };
    //
    //     return (
    //       <div onClick={(e) => e.stopPropagation()}>
    //         <SheButton
    //           onClick={handleManageClick}
    //           disabled={meta?.isRowLoading(row.id)}
    //           value={activeTab === "connectProducts" ? "Add" : "Update"}
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      id: "rowActions",
      header: "",
      size: 20,
      minSize: 20,
      maxSize: 20,
      cell: ({ row, table }) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProductsGridColumnActions
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
