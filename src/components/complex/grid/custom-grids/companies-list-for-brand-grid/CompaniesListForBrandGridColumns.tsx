import { ColumnDef } from "@tanstack/react-table";

import { Circle, CircleCheckBig, CogIcon, ImageIcon } from "lucide-react";

import cs from "./CompaniesListForBrandGridColumns.module.scss";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export function CompaniesListForBrandGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: any) => void;
}): ColumnDef<CompanyModel>[] {
  return [
    {
      id: "select",
      header: "Select",
      minSize: 58,
      maxSize: 58,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleSelectClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("selectCompany", row.original);
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
      id: "companyName",
      header: "Company",
      cell: ({ row }) => {
        const imageUrl: string = row.original.thumbnailUrl;
        const name: string = row.original.companyName;
        const address1: string = row.original.address;
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "100%",
            }}
          >
            <div style={{ width: "100%", maxWidth: "40px" }}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name || "Supplier"}
                  className="object-cover rounded-md w-full h-full"
                  style={{ width: "100%" }}
                />
              ) : (
                <SheIcon icon={ImageIcon} />
              )}
            </div>
            <SheTooltip
              delayDuration={200}
              text={name}
              className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className="she-text">{name}</span>
            </SheTooltip>
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
          onAction("manageCompany", row.original);
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
