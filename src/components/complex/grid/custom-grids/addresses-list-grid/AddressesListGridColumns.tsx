import { Circle, CircleCheckBig, CogIcon } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import React from "react";

import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./AddressesListGridColumns.module.scss";

export function AddressesListGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "select",
      minSize: 70,
      maxSize: 70,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleSelectClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("selectAddress", row.original.addressId);
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
      id: "city",
      header: "Address",
      minSize: 100,
      cell: ({ row }) => {
        const addressName: string = row.original.alias;
        const addressLine1: string = row.original.addressLine1;
        const addressLine2: string = row.original.addressLine2;
        return (
          <div className={cs.customerNameBlock}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SheTooltip
                delayDuration={200}
                text={addressName}
                className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">{addressName}</span>
              </SheTooltip>
              {addressLine1 && (
                <SheTooltip
                  delayDuration={200}
                  text={addressLine1}
                  className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{addressLine1}</span>
                </SheTooltip>
              )}
              {addressLine2 && (
                <SheTooltip
                  delayDuration={200}
                  text={addressLine2}
                  className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{addressLine2}</span>
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
      minSize: 120,
      maxSize: 120,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("manageAddress", row.original);
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
