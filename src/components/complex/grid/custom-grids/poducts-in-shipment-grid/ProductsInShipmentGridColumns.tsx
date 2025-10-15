import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export const ProductsInShipmentGridColumns: ColumnDef<any>[] = [
  {
    id: "variantName",
    accessorFn: (row) => row.variantName,
    header: "Product",
    minSize: 100,
    cell: ({ row }) => {
      const image: string = row.original.photo?.thumbnailUrl;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "40px" }}>
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
              className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
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
    id: "qtyOrdered",
    header: "Qty ordered",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      return <span>{row.original.qtyOrdered}</span>;
    },
  },
  {
    id: "qtyToShip",
    header: "Qty to ship",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      return <span>{row.original.qtyToShip}</span>;
    },
  },
  {
    id: "qtyShipped",
    header: "Qty shipped",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      return <span>{row.original.qtyShipped}</span>;
    },
  },
];
