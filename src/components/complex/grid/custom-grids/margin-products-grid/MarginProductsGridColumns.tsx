import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";

import cs from "./MarginProductsGridColumns.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import MarginItemsForm from "@/components/forms/margin-items-form/MarginItemsForm.tsx";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { convertToSelectItems } from "@/utils/converters/primitive-components/she-select-convertors.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

export function marginProductsGridColumns(
  taxes: TaxTypeModel[],
  onAction: any,
): ColumnDef<any>[] {
  return [
    {
      accessorKey: "thumbnailUrl",
      header: "Image",
      minSize: 56,
      maxSize: 56,
      cell: ({ row }) => {
        const image: string = row.getValue("thumbnailUrl");

        return (
          <SheIcon
            icon={image || ImageIcon}
            className="m-auto"
            style={{
              ...(!image && {
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
      maxSize: 150,
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
      minSize: 100,
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
      accessorKey: "traitOptions",
      header: "Details",
      minSize: 80,
      maxSize: 200,
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
      accessorKey: "purchasePrice",
      header: "Purchase Price",
      minSize: 120,
      maxSize: 200,
      enableHiding: false,
      cell: ({ row }) => {
        return <span>{row.getValue("purchasePrice")}</span>;
      },
    },
    {
      accessorKey: "currentPrice",
      header: () => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            maxWidth: "80px",
          }}
        >
          <span style={{ textWrap: "wrap" }}>Current Price</span>
          <SheTooltip showDefaultIcon />
        </div>
      ),
      minSize: 100,
      maxSize: 200,
      enableHiding: false,
      cell: ({ row }) => {
        return <span>{row.getValue("currentPrice")}</span>;
      },
    },
    {
      id: "form",
      accessorKey: "",
      minSize: 460,
      maxSize: 460,
      enableHiding: false,
      header: () => (
        <div className="flex items-center">
          <span style={{ marginLeft: "3px", marginRight: "92px" }}>Tax</span>
          <span style={{ marginRight: "84px" }}>Margin Price</span>
          <span>Quantity</span>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <MarginItemsForm
            className={cs.marginItemsForm}
            data={row.original}
            taxes={convertToSelectItems(taxes, {
              text: "name",
              value: "id",
            })}
            currentPrice={row.getValue("currentPrice")}
            onMarginItemChange={(data) => {
              onAction("updateMarginItem", data);
            }}
            onApply={(id) => onAction("applyMarginItem", id)}
          />
        );
      },
    },
  ];
}
