import { ColumnDef, Row } from "@tanstack/react-table";
import React from "react";

import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import cs from "./SelectProductsForOrderGridColumns.module.scss";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ImageIcon } from "lucide-react";

export const SelectProductsForOrderGridColumns = (
  onAction: (actionType: string, row?: Row<any>) => void,
): ColumnDef<any>[] => [
  {
    id: "checkBox",
    minSize: 30,
    maxSize: 30,
    cell: ({ row }) => {
      return (
        <SheToggle
          checked={row.original.checked}
          onChecked={() =>
            row.original.checked
              ? onAction("removeVariantFromOrder", row.original)
              : onAction("addVariantToOrder", row.original)
          }
        />
      );
    },
  },
  {
    accessorKey: "product",
    header: "Product",
    minSize: 90,
    cell: ({ row }) => {
      const image: ImageModel = row.original.photo as ImageModel;
      return (
        <div className={cs.variantInfo}>
          {image?.thumbnailUrl ? (
            <img
              className={cs.variantInfoImage}
              src={image?.thumbnailUrl}
              alt={image?.thumbnailUrl}
            />
          ) : (
            <SheIcon icon={ImageIcon} />
          )}
          <SheTooltip
            delayDuration={200}
            text={row.original.variantName}
            className={cs.variantNameTooltip}
          >
            <span className={`${cs.variantName} she-text`}>
              {row.original.variantName}
            </span>
          </SheTooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "traits",
    header: "Traits",
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
      console.log(traitOptions);
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            maxWidth: "60px",
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
              }}
            />
          ))}
          {sizeOptions.length > 0 && (
            <SheTooltip
              delayDuration={200}
              text={sizeOptions[0].optionName}
              className="max-w-[30px] min-w-[30px] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className={`${cs.traitName} she-text`}>
                {sizeOptions[0].optionName}
              </span>
            </SheTooltip>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    minSize: 80,
    maxSize: 80,
    cell: ({ row }) => {
      return (
        <span>
          {`${row.original.stockAmount ?? 0}${row.original.stockDocumentPrice.currencyName}`}
        </span>
      );
    },
  },
  {
    accessorKey: "units",
    header: "Units",
    minSize: 60,
    maxSize: 60,
    cell: ({ row }) => {
      return <span>{row.original.stockAmount ?? 0}</span>;
    },
  },
];
