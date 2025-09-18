import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ImageIcon, TrashIcon } from "lucide-react";
import { formatDate } from "@/utils/helpers/quick-helper.ts";

export function purchasesGridColumns(onAction: any): ColumnDef<any>[] {
  return [
    {
      accessorKey: "purchaseId",
      header: "ID",
      size: 20,
      minSize: 20,
      maxSize: 20,
    },
    {
      id: "supplierName",
      accessorFn: (row) => row.supplier?.supplierName,
      header: "Supplier",
      size: 150,
      minSize: 150,
      maxSize: 200,
      cell: ({ row }) => {
        const imageUrl: string = row.original.supplier?.thumbnailUrl;
        const name: string = row.original.supplier?.supplierName;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name || "Supplier"}
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
                className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span>{row.getValue("supplierName")}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 150,
      minSize: 150,
      maxSize: 200,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.original.location?.address}
            className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span>{row.original.location?.address}</span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "documentNotes",
      header: "Notes",
      size: 100,
      minSize: 100,
      maxSize: 200,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.getValue("documentNotes")}
            className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span>{row.getValue("documentNotes")}</span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const formattedDate = formatDate(row.getValue("date"), "date");
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "unitsAmount",
      header: "Units",
      size: 70,
      minSize: 70,
      maxSize: 70,
      cell: ({ row }) => {
        return <span>{`${row.getValue("unitsAmount")} units`}</span>;
      },
    },
    {
      accessorKey: "expense",
      header: "Expense",
      size: 70,
      minSize: 70,
      maxSize: 70,
      cell: ({ row }) => {
        const currency: string = row.original.currencyBrief;
        return <span>{`${row.getValue("expense")} ${currency}`}</span>;
      },
    },
    {
      accessorKey: "soldAmount",
      header: "Sold",
      size: 70,
      minSize: 70,
      maxSize: 70,
      cell: ({ row }) => {
        const currency: string = row.original.currencyBrief;
        return <span>{`${row.getValue("soldAmount")} ${currency}`}</span>;
      },
    },
    {
      accessorKey: "valueAmount",
      header: "Order Value",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        const currency: string = row.original.currencyBrief;
        return <span>{`${row.getValue("valueAmount")} ${currency}`}</span>;
      },
    },
    {
      id: "manage",
      header: "",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              onClick={() => onAction("managePurchase", row.original)}
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
      size: 40,
      minSize: 40,
      maxSize: 40,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={TrashIcon}
              variant="secondary"
              onClick={() => onAction("deletePurchase", { table, row })}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
