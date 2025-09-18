import { ColumnDef } from "@tanstack/react-table";

import { Circle, CircleCheckBig, ImageIcon } from "lucide-react";

import cs from "./SelectPurchaseGridColumns.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

export function SelectPurchaseGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: PurchaseModel) => void;
}): ColumnDef<PurchaseModel>[] {
  return [
    {
      id: "select",
      header: "Select",
      size: 30,
      minSize: 30,
      maxSize: 30,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              className={row.original.isSelected === true ? cs.iconCheck : ""}
              icon={row.original.isSelected === true ? CircleCheckBig : Circle}
              variant="ghost"
              onClick={() => onAction("selectPurchase", row.original)}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
    {
      id: "Purchase",
      header: "Purchase",
      size: 200,
      minSize: 200,
      maxSize: 200,
      cell: ({ row }) => {
        const imageUrl: string = row.original.supplier?.thumbnailUrl;
        const name: string = row.original.supplier?.supplierName;
        const address: string = row.original.location?.address;
        const date: string = row.original.date;

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
                  src={imageUrl}
                  alt={name || "Supplier"}
                  className="object-cover rounded-md w-full h-full"
                  style={{ minWidth: "48px", height: "48px" }}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <SheTooltip
                delayDuration={200}
                text={name}
                className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">{name}</span>
              </SheTooltip>
              {address && (
                <SheTooltip
                  delayDuration={200}
                  text={address}
                  className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{address}</span>
                </SheTooltip>
              )}
              {date && (
                <SheTooltip
                  delayDuration={200}
                  text={date}
                  className="max-w-[calc(100%-20px)] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-text">{formatDate(date, "date")}</span>
                </SheTooltip>
              )}
            </div>
          </div>
        );
      },
    },
  ];
}
