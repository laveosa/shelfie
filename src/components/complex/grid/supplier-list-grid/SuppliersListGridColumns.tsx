import { ColumnDef, Row } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";

import placeholderImage from "@/assets/images/placeholder-image.png";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { Input } from "@/components/ui/input.tsx";
import SuppliersListGridColumnActions from "@/components/complex/grid/supplier-list-grid/SuppliersListGridColumnsActions.tsx";

export function SuppliersListGridColumns({
  onGridAction,
  selectedSupplier,
  setSelectedSupplier,
}: {
  onGridAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
  ) => void;
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
        const imageUrl: string = row.original.thumbnailUrl;
        const name: string = row.original.supplierName;
        const address1: string = row.original.addressLine1;
        const address2: string = row.original.addressLine2;
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginLeft: "-8px",
            }}
          >
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl || placeholderImage}
                  alt={name || "Supplier"}
                  className="object-cover rounded-md w-full h-full"
                  style={{ width: "48px", height: "48px" }}
                />
              ) : (
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SheIcon icon={ImageIcon} maxWidth="30px" />
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SheTooltip
                delayDuration={200}
                text={name}
                className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">{name}</span>
              </SheTooltip>
              {address1 && (
                <SheTooltip
                  delayDuration={200}
                  text={address1}
                  className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{address1}</span>
                </SheTooltip>
              )}
              {address2 && (
                <SheTooltip
                  delayDuration={200}
                  text={address2}
                  className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{address2}</span>
                </SheTooltip>
              )}
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
            <SuppliersListGridColumnActions
              row={row}
              onAction={onGridAction}
              table={table}
            />
          </div>
        );
      },
    },
  ];
}
