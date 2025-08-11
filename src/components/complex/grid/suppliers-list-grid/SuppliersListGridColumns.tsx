import { ColumnDef, Row } from "@tanstack/react-table";
import { Circle, CircleCheckBig, CogIcon, ImageIcon } from "lucide-react";

import placeholderImage from "@/assets/images/placeholder-image.png";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./SuppliersListGridColumns.module.scss";

export function SuppliersListGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "select",
      header: "Select",
      size: 50,
      minSize: 50,
      maxSize: 50,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleSelectClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("selectSupplier", row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              className={row.original.isSelected === true ? cs.iconCheck : ""}
              icon={row.original.isSelected === true ? CircleCheckBig : Circle}
              variant="ghost"
              onClick={handleSelectClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
    {
      id: "supplierName",
      header: "Supplier",
      size: 150,
      minSize: 150,
      maxSize: 150,
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
                className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">{name}</span>
              </SheTooltip>
              {address1 && (
                <SheTooltip
                  delayDuration={200}
                  text={address1}
                  className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{address1}</span>
                </SheTooltip>
              )}
              {address2 && (
                <SheTooltip
                  delayDuration={200}
                  text={address2}
                  className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
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
      id: "manage",
      header: "Actions",
      minSize: 100,
      maxSize: 100,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("manageSupplier", row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={CogIcon}
              value="Manage"
              variant="secondary"
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
