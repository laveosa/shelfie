import { ColumnDef } from "@tanstack/react-table";

import { ImageIcon, TrashIcon } from "lucide-react";

import cs from "./ProductsGridColumns.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";

export function ProductsGridColumns(onAction: any): ColumnDef<ProductModel>[] {
  const { translate } = useAppTranslation();
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
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => (
        <span className="she-text">{row.getValue("productId")}</span>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      minSize: 56,
      maxSize: 56,
      cell: ({ row }) => {
        const image: ImageModel = row.getValue("image") as ImageModel;
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
      accessorKey: "productCode",
      header: "Code",
      minSize: 60,
      cell: ({ row }) => (
        <SheTooltip delayDuration={200} text={row.getValue("productCode")}>
          <span className={`${cs.productCode} she-text`}>
            {row.getValue("productCode")}
          </span>
        </SheTooltip>
      ),
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      minSize: 150,
      cell: ({ row }) => (
        <SheTooltip delayDuration={200} text={row.getValue("productName")}>
          <span className={`${cs.productName} she-text`}>
            {row.getValue("productName")}
          </span>
        </SheTooltip>
      ),
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
              <span className="she-text">
                {category?.categoryName || "N/A"}
              </span>
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
        const brand: BrandModel = row.original.brand as BrandModel;
        return (
          <SheTooltip delayDuration={200} text={brand?.brandName || "N/A"}>
            <div className={cs.productBrand}>
              {brand?.thumbnail && (
                <img src={brand?.thumbnail} alt={brand?.brandName} />
              )}
              <span className="she-text">{brand?.brandName || "N/A"}</span>
            </div>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "barcode",
      header: "Barcode",
      minSize: 40,
      cell: ({ row }) => (
        <span className="she-text">{row.getValue("barcode")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      minSize: 120,
      cell: ({ row }) => (
        <div
          className={`${cs.productStatus} ${statusClass(row.getValue("status"))}`}
        >
          <span>{row.getValue("status")}</span>
        </div>
      ),
    },
    {
      accessorKey: "salePrice",
      header: "Sale Price",
      minSize: 80,
      cell: ({ row }) => {
        const price: string = row.getValue("salePrice");
        return <span className="she-text">{price ? price : "N/A"}</span>;
      },
    },
    {
      accessorKey: "variantsCount",
      header: "Variants",
      minSize: 80,
      cell: ({ row }) => (
        <span className="she-text">{row.getValue("variantsCount")}</span>
      ),
    },
    {
      accessorKey: "stockAmount",
      header: "Stock",
      minSize: 60,
      cell: ({ row }) => (
        <span className="she-text">{`${row.getValue("stockAmount")} ${row.getValue("stockAmount") === 1 ? "unit" : "units"}`}</span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Active",
      minSize: 80,
      maxSize: 160,
      cell: ({ row }) => (
        <SheToggle
          checked={row.original.isActive}
          type={SheToggleTypeEnum.SWITCH}
          onChecked={() => onAction("activateProduct", row.original)}
        />
      ),
    },
    {
      id: "manage",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => (
        <SheButton
          value={translate("CommonButtons.Manage")}
          onClick={() => onAction("manageProduct", row.original.productId)}
        />
      ),
    },
    {
      id: "rowActions",
      header: "",
      minSize: 56,
      maxSize: 56,
      cell: ({ row, table }) => (
        <SheButton
          icon={TrashIcon}
          variant="secondary"
          onClick={() => onAction("deleteProduct", { table, row })}
        />
      ),
    },
  ];
}
