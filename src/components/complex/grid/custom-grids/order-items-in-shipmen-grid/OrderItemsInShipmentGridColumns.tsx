import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon, PackagePlus } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cs from "./OrderItemsInShipment.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export function orderItemsInShipmentGridColumns({
  onAction,
  onHandelUpGridData,
}: {
  onAction: (actionType: string, row?: any, quantity?: string) => void;
  onHandelUpGridData: (table?: any[]) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "variantName",
      accessorFn: (row) => row.variantName,
      header: "Product",
      minSize: 120,
      cell: ({ row }) => {
        const image: string = row.original.photo?.thumbnailUrl;
        return (
          <div className={cs.variantNameCell}>
            <div className={cs.imageBlock}>
              {image ? (
                <img
                  src={image}
                  alt={row.original.variantName || "Variant"}
                  className={cs.variantPhoto}
                />
              ) : (
                <div className={cs.iconContainer}>
                  <SheIcon icon={ImageIcon} maxWidth="30px" />
                </div>
              )}
            </div>
            <div>
              <SheTooltip
                delayDuration={200}
                text={row.getValue("variantName")}
                className={cs.variantName}
              >
                <span>{row.getValue("variantName")}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "traitOptions",
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
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.original.orderId}</span>;
      },
    },
    {
      accessorKey: "orderedAmount",
      header: "Qty pending",
      minSize: 100,
      cell: ({ row }) => {
        return <span>{row.original.orderedAmount}</span>;
      },
    },
    {
      accessorKey: "quantity",
      header: "Qty to add",
      minSize: 100,
      cell: ({ row, table }) => (
        <SheInput
          value={row.original.amount}
          type="number"
          onChange={(value) => {
            row.original.amount = value;
            onHandelUpGridData(table.options.data);
          }}
        />
      ),
    },
    {
      id: "add",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={PackagePlus}
              value="Add"
              variant="secondary"
              onClick={() => {
                onAction("addItemToShipment", {
                  stockActionId: row.original.stockActionId,
                  quantity: row.original.amount,
                });
              }}
            />
          </div>
        );
      },
    },
  ];
}
