import { ColumnDef } from "@tanstack/react-table";
// Removed SheToggle import - using radio button instead
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ImageIcon } from "lucide-react";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import PurchasesGridColumnActions from "@/components/complex/grid/purchases-grid/PurchasesGridColumnsActions.tsx";
import { Input } from "@/components/ui/input.tsx";

export function SupplierListGridColumns({
  onAction,
  selectedSupplier,
  setSelectedSupplier,
}: {
  onAction: any;
  selectedSupplier: any | null;
  setSelectedSupplier: (supplier: any | null) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "checkbox",
      size: 20,
      cell: ({ row }) => {
        const isChecked =
          selectedSupplier?.supplierId === row.original.supplierId;
        return (
          <Input
            type="radio"
            name="supplierSelection"
            checked={isChecked}
            onChange={() => {
              setSelectedSupplier(row.original);
            }}
            style={{ filter: "grayscale(1)" }}
            className="w-4 h-4 cursor-pointer"
          />
        );
      },
    },
    {
      id: "supplierName",
      header: "Supplier",
      size: 200,
      minSize: 200,
      maxSize: 200,
      cell: ({ row }) => {
        const imageUrl: string = row.original.photo;
        const name: string = row.original.supplierName;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl || placeholderImage}
                  alt={name || "Supplier"}
                  className="object-cover rounded-md w-full h-full"
                />
              ) : (
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              )}
            </div>
            <div>
              <SheTooltip
                delayDuration={200}
                text={name}
                className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span>{name}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      id: "rowActions",
      header: "",
      size: 70,
      minSize: 70,
      maxSize: 70,
      cell: ({ row, table }) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PurchasesGridColumnActions
              row={row}
              onAction={onAction}
              table={table}
            />
          </div>
        );
      },
    },
  ];
}
