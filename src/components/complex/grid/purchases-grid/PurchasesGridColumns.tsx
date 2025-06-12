import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import PurchasesGridColumnActions from "@/components/complex/grid/purchases-grid/PurchasesGridColumnsActions.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ImageIcon } from "lucide-react";
import { formatDate } from "@/utils/helpers/quick-helper.ts";

export function purchasesGridColumns(onAction: any): ColumnDef<any>[] {
  return [
    {
      accessorKey: "purchaseId",
      header: "ID",
      minSize: 50,
      maxSize: 50,
    },
    {
      id: "supplierName",
      accessorFn: (row) => row.supplier?.supplierName,
      header: "Supplier",
      size: 200,
      minSize: 200,
      maxSize: 200,
      cell: ({ row }) => {
        const imageUrl: string = row.original.supplier?.photo?.thumbnailUrl;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl || placeholderImage}
                  alt={row.original.supplier?.supplierName || "Supplier"}
                  className="object-cover rounded-md w-12 h-12"
                />
              ) : (
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              )}
            </div>
            <div>
              <SheTooltip
                delayDuration={200}
                text={row.getValue("supplierName")}
                className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span>{row.getValue("supplierName")}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      maxSize: 100,
      cell: ({ row }) => {
        const formattedDate = formatDate(row.getValue("date"), "date");
        return (
          <SheTooltip delayDuration={200} text={formattedDate}>
            <span>{formattedDate}</span>
          </SheTooltip>
        );
      },
    },
    {
      // accessorKey: "date",
      header: "Units",
      maxSize: 100,
      cell: ({}) => {
        return (
          <SheTooltip delayDuration={200} text={""}>
            <span></span>
          </SheTooltip>
        );
      },
    },
    {
      // accessorKey: "date",
      header: "Expense",
      maxSize: 100,
      cell: ({}) => {
        return (
          <SheTooltip delayDuration={200} text={""}>
            <span></span>
          </SheTooltip>
        );
      },
    },
    {
      // accessorKey: "date",
      header: "Sold",
      maxSize: 100,
      cell: ({}) => {
        return (
          <SheTooltip delayDuration={200} text={""}>
            <span></span>
          </SheTooltip>
        );
      },
    },
    {
      // accessorKey: "date",
      header: "Order Value",
      maxSize: 100,
      cell: ({}) => {
        return (
          <SheTooltip delayDuration={200} text={""}>
            <span></span>
          </SheTooltip>
        );
      },
    },
    {
      id: "manage",
      header: "",
      size: 100,
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
          onAction("managePurchase", row.id, meta?.setLoadingRow, row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            >
              Manage
            </SheButton>
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
