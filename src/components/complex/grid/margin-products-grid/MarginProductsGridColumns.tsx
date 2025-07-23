import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";

import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cs from "./MarginProductsGridColumns.module.scss";
import MarginItemsForm from "@/components/forms/margin-items-form/MarginItemsForm.tsx";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export function marginProductsGridColumns(
  taxes: TaxTypeModel[],
  onAction: any,
): ColumnDef<any>[] {
  return [
    {
      accessorKey: "thumbnailUrl",
      header: "",
      size: 30,
      minSize: 30,
      maxSize: 30,
      cell: ({ row, table }) => {
        const image: string = row.getValue("thumbnailUrl");
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
                src={image || placeholderImage}
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
      size: 40,
      minSize: 40,
      maxSize: 40,
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
      size: 50,
      minSize: 50,
      maxSize: 50,
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
      size: 40,
      minSize: 40,
      maxSize: 40,
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
      accessorKey: "purchasePrice",
      header: "Purchase Price",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return <span>{row.getValue("purchasePrice")}</span>;
      },
    },
    {
      accessorKey: "currentPrice",
      header: "Current Price",
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return <span>{row.getValue("currentPrice")}</span>;
      },
    },
    {
      id: "form",
      accessorKey: "",
      size: 220,
      minSize: 220,
      header: "",
      cell: ({ row }) => {
        const stockActionId = row.original.stockActionId;
        const data = {
          marginPrice: row.original.marginPrice,
          taxTypeId: Number(row.original.taxTypeId),
          quantity: row.original.unitsAmount,
        };
        return (
          <MarginItemsForm
            taxes={taxes}
            data={data}
            onSubmit={(data) => {
              onAction("updatePurchaseProduct", { data, stockActionId });
            }}
          />
        );
      },
    },
  ];
}
