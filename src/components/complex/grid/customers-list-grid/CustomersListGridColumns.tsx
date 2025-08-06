import { Circle, CircleCheckBig, CogIcon, ImageIcon } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import React from "react";

import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./CustomersListGridColumns.module.scss";
import { getInitials } from "@/utils/helpers/quick-helper.ts";

export function CustomersListGridColumns({
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
          onAction("selectCustomer", row.original);
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
      id: "customerName",
      header: "Customer",
      size: 150,
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => {
        const imageUrl: string = row.original.thumbnailUrl;
        const name: string = row.original.customerName;
        const email: string = row.original.email;
        const phoneNumber: string = row.original.phoneNumber;
        return (
          <div className={cs.customerNameBlock}>
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name || "Customer"}
                  className="object-cover rounded-md w-full h-full"
                  style={{ width: "48px", height: "48px" }}
                />
              ) : name ? (
                <div className={cs.avatarInitials}>{getInitials(name)}</div>
              ) : (
                <div className={cs.noImageIcon}>
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
              {email && (
                <SheTooltip
                  delayDuration={200}
                  text={email}
                  className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{email}</span>
                </SheTooltip>
              )}
              {phoneNumber && (
                <SheTooltip
                  delayDuration={200}
                  text={phoneNumber}
                  className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{phoneNumber}</span>
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
          onAction("manageCustomer", row.original);
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
