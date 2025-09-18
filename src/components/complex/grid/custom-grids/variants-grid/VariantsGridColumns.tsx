import { ColumnDef } from "@tanstack/react-table";

import { ImageIcon, TrashIcon } from "lucide-react";

import cs from "./VariantGridColumns.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export function VariantsGridColumns(onAction: any): ColumnDef<any>[] {
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
      accessorKey: "variantId",
      header: "ID",
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => (
        <span className="she-text">{row.getValue("variantId")}</span>
      ),
    },
    {
      accessorKey: "photo",
      header: "Image",
      minSize: 56,
      maxSize: 56,
      cell: ({ row }) => (
        <SheIcon
          icon={row.getValue("photo")?.thumbnailUrl || ImageIcon}
          className="m-auto"
          style={{
            ...(!row.getValue("photo")?.thumbnailUrl && {
              padding: "10px",
            }),
          }}
          color="#64748b"
          iconView={IconViewEnum.BUTTON}
        />
      ),
    },
    {
      accessorKey: "variantCode",
      header: "Code",
      minSize: 60,
      cell: ({ row }) => (
        <SheTooltip delayDuration={200} text={row.getValue("variantCode")}>
          <span className={`${cs.variantCode} she-text`}>
            {row.getValue("variantCode")}
          </span>
        </SheTooltip>
      ),
    },
    {
      accessorKey: "variantName",
      header: "Variant Name",
      minSize: 150,
      cell: ({ row }) => (
        <SheTooltip delayDuration={200} text={row.getValue("variantName")}>
          <span className={`${cs.variantName} she-text`}>
            {row.getValue("variantName")}
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
      cell: ({ row }) => (
        <SheTooltip
          delayDuration={200}
          text={row.getValue("brand")?.brandName || "N/A"}
        >
          <div className={cs.productCategory}>
            {row.original.brand?.thumbnail && (
              <img
                src={row.original.brand?.thumbnail}
                alt={row.original.brand.brandName}
              />
            )}
            <span className="she-text">
              {row.getValue("brand")?.brandName || "N/A"}
            </span>
          </div>
        </SheTooltip>
      ),
    },
    {
      accessorKey: "traitOptions",
      header: "Details",
      minSize: 80,
      maxSize: 80,
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
              <span
                key={`size-${index}`}
                style={{ fontSize: "0.875rem" }}
                className="she-text"
              >
                {sizeOpt.optionName}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      minSize: 120,
      cell: ({ row }) => (
        <div
          className={`${cs.productStatus} ${statusClass(row.getValue("status"))}`}
        >
          <span className="she-text">{row.getValue("status")}</span>
        </div>
      ),
    },
    {
      accessorKey: "salePrice",
      header: "Price",
      minSize: 80,
      cell: ({ row }) => {
        const price: string = row.getValue("salePrice");
        return <span className="she-text">{price ? price : "N/A"}</span>;
      },
    },
    {
      accessorKey: "stockAmount",
      header: "In Stock",
      minSize: 60,
      cell: ({ row }) => {
        return (
          <span className="she-text">{`${row.getValue("stockAmount")} units`}</span>
        );
      },
    },
    /*{
      accessorKey: "isActive",
      header: "Active",
      minSize: 80,
      maxSize: 160,
      cell: ({ row }) => (
        <SheToggle
          checked={row.getValue("active")}
          type={SheToggleTypeEnum.SWITCH}
          onChecked={() =>
            onAction("activateVariant", row.id, undefined, row.original)
          }
        />
      ),
    },*/
    {
      id: "manage",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => (
        <SheButton
          value={translate("CommonButtons.Manage")}
          onClick={() => onAction("manageVariant", row.original)}
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
          onClick={() => onAction("deleteVariant", { table, row })}
        />
      ),
    },
  ];
}
