import { ColumnDef, Row } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";

import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cs from "./PackageContentGridColumns.module.scss";

export function PackageContentGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>, quantity?: string) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "variantName",
      accessorFn: (row) => row.variantName,
      header: "Product",
      minSize: 160,
      maxSize: 160,
      cell: ({ row }) => {
        const image: string = row.original.photo?.thumbnailUrl;
        return (
          <div className={cs.variantNameCell}>
            <div className={cs.productNameImageBlock}>
              {image ? (
                <img
                  src={image}
                  alt={row.original.variantName || "Variant"}
                  className={cs.productNameImage}
                />
              ) : (
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              )}
            </div>
            <SheTooltip
              delayDuration={200}
              text={row.getValue("variantName")}
              className={cs.variantName}
            >
              <span>{row.getValue("variantName")}</span>
            </SheTooltip>
          </div>
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
          <div className={cs.traitOptionsCell}>
            {colorOptions.map((colorOpt, index) => (
              <div
                key={`color-${index}`}
                className={cs.colorOptions}
                style={{
                  background: colorOpt.optionColor,
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
      accessorKey: "orderId",
      header: "Order",
      minSize: 80,
      cell: ({ row }) => {
        return (
          <div
            className={`${cs.orderLink} she-text-link`}
            onClick={() => onAction("navigateToOrder", row.original.orderId)}
          >
            {row.original.orderId}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Qty packed",
      minSize: 100,
      cell: ({ row }) => {
        return <span className="she-text">{row.original.quantityPacked} </span>;
      },
    },
  ];
}
