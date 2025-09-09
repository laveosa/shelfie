import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon, TrashIcon } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { Switch } from "@/components/ui/switch.tsx";
import cs from "./ProductsGridColumns.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export function ProductsGridColumns(onAction: any): ColumnDef<any, any>[] {
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
      cell: ({ row }) => <span>{row.getValue("productId")}</span>,
    },
    {
      accessorKey: "image",
      header: "Image",
      minSize: 56,
      maxSize: 56,
      cell: ({ row }) => (
        <SheIcon
          icon={row.getValue("image")?.thumbnailUrl || ImageIcon}
          className="m-auto"
          style={{
            ...(!row.getValue("image")?.thumbnailUrl && {
              padding: "10px",
            }),
          }}
          color="#64748b"
          iconView={IconViewEnum.BUTTON}
        />
      ),
    },
    {
      accessorKey: "productCode",
      header: "Code",
      minSize: 60,
      cell: ({ row }) => (
        <SheTooltip delayDuration={200} text={row.getValue("productCode")}>
          <span className={cs.productCode}>{row.getValue("productCode")}</span>
        </SheTooltip>
      ),
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
      minSize: 40,
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
              {!row.original.brand?.thumbnail && (
                <span>{brand?.brandName || "N/A"}</span>
              )}
            </div>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "barcode",
      header: "Barcode",
      minSize: 40,
      cell: ({ row }) => <span>{row.getValue("barcode")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      minSize: 120,
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
      minSize: 80,
      cell: ({ row }) => {
        const price: string = row.getValue("salePrice");
        return <span>{price ? price : "N/A"}</span>;
      },
    },
    {
      accessorKey: "variantsCount",
      header: "Variants",
      minSize: 80,
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
      minSize: 60,
      cell: ({ row }) => {
        return <span>{`${row.getValue("stockAmount")} units`}</span>;
      },
    },
    {
      accessorKey: "isActive",
      header: "Active",
      minSize: 80,
      maxSize: 160,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };
        const rowId = row.id;

        return (
          <Switch
            disabled={meta?.isRowLoading(rowId)}
            checked={row.original.isActive}
            onCheckedChange={() => onAction("activateProduct", row.original)}
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

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              onClick={() => onAction("manageProduct", row.original.productId)}
              disabled={meta?.isRowLoading(row.id)}
              value={translate("CommonButtons.Manage")}
            />
          </div>
        );
      },
    },
    {
      id: "rowActions",
      header: "",
      minSize: 56,
      maxSize: 56,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={TrashIcon}
              variant="secondary"
              onClick={() => onAction("deleteProduct", { table, row })}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
