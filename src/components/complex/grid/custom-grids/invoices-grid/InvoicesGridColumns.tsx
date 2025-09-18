import { Download, Eye, FileIcon, Trash2 } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import React from "react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import cs from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.module.scss";

interface IInvoicesGridColumns {
  id: number | string;
  thumbnailUrl: string;
  height: number;
  width: number;
  isActive: boolean;
  onDelete: (data) => void;
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IInvoicesGridColumns>,
  ) => void;
}

export const InvoicesGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IInvoicesGridColumns>,
  ) => void,
  onDelete: (data) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "thumbnailUrl",
    header: "File Name",
    minSize: 155,
    maxSize: 155,
    cell: ({ row }) => {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SheIcon icon={FileIcon} maxWidth="30px" minWidth="30px" />
          <SheTooltip
            delayDuration={200}
            text={row.original.originalName}
            className="max-w-[100%] min-w-[10px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span className={`${cs.traitName} she-text`}>
              {row.original.originalName}
            </span>
          </SheTooltip>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    minSize: 220,
    maxSize: 220,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <SheButton
            icon={Eye}
            variant="secondary"
            value="Preview"
            onClick={() =>
              onAction("preview", row.id, meta?.setLoadingRow, row)
            }
          />
          <SheButton
            icon={Download}
            variant="secondary"
            onClick={() =>
              onAction("download", row.id, meta?.setLoadingRow, row)
            }
          />
          <SheButton
            icon={Trash2}
            variant="outline"
            onClick={() => onDelete({ table, row })}
          />
        </div>
      );
    },
  },
];
