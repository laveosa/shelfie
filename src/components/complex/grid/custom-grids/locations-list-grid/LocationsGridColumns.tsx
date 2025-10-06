import { CogIcon, ImageIcon } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import React from "react";

import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function LocationsListGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "name",
      header: "Locations",
      cell: ({ row }) => {
        const imageUrl: string = row.original.photos[0].thumbnailUrl;
        const name: string = row.original.name;
        const address1: string = row.original.addressLine1;
        const address2: string = row.original.addressLine2;
        const country: string = row.original.countryName;
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SheTooltip
                delayDuration={200}
                text={name}
                className="max-w-[190px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">{name}</span>
              </SheTooltip>
              {address1 && (
                <SheTooltip
                  delayDuration={200}
                  text={address1}
                  className="max-w-[190px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{address1}</span>
                </SheTooltip>
              )}
              {address2 && (
                <SheTooltip
                  delayDuration={200}
                  text={address2}
                  className="max-w-[190px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{address2}</span>
                </SheTooltip>
              )}
              {country && (
                <SheTooltip
                  delayDuration={200}
                  text={country}
                  className="max-w-[190px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{country}</span>
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
          onAction("openLocationConfigurationCard", row.original);
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
