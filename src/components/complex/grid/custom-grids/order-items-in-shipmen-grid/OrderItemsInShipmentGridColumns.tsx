import { ColumnDef, Row } from "@tanstack/react-table";
import { ImageIcon, PackagePlus } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import QuantityInputCell from "@/components/complex/grid/custom-grids/find-product-grid/QuantityInputCell.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export function orderItemsInShipmentGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>, quantity?: string) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "variantName",
      accessorFn: (row) => row.variantName,
      header: "Product",
      size: 120,
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        const image: string = row.original.photo;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {image ? (
                <img
                  src={image}
                  alt={row.original.variantName || "Variant"}
                  className="object-cover rounded-md w-12 h-12"
                />
              ) : (
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              )}
            </div>
            <div>
              <SheTooltip
                delayDuration={200}
                text={row.getValue("variantName")}
                className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap"
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
      header: "Details",
      size: 60,
      minSize: 60,
      maxSize: 60,
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
      accessorKey: "orderId",
      header: "Order",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return <span>{row.original.orderId}</span>;
      },
    },
    {
      accessorKey: "orderedAmount",
      header: "Qty pending",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <span>{row.original.orderId}</span>;
      },
    },
    {
      accessorKey: "quantity",
      header: "Qty to add",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => <QuantityInputCell row={row} />,
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
              onClick={() => onAction("addItemToShipment", row.original)}
            />
          </div>
        );
      },
    },
  ];
}
