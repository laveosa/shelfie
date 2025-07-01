import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ImageIcon, TrashIcon } from "lucide-react";
import { formatDate } from "@/utils/helpers/quick-helper.ts";

export function purchasesGridColumns(
  onAction: any,
  onDelete: (data) => void,
): ColumnDef<any>[] {
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
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "unitsAmount",
      header: "Units",
      maxSize: 70,
      cell: ({ row }) => {
        return <span>{`${row.getValue("unitsAmount")} units`}</span>;
      },
    },
    {
      accessorKey: "expense",
      header: "Expense",
      maxSize: 70,
      cell: ({ row }) => {
        const currency: string = row.original.currencyBrief;
        return <span>{`${row.getValue("expense")} ${currency}`}</span>;
      },
    },
    {
      accessorKey: "soldAmount",
      header: "Sold",
      maxSize: 70,
      cell: ({ row }) => {
        const currency: string = row.original.currencyBrief;
        return <span>{`${row.getValue("soldAmount")} ${currency}`}</span>;
      },
    },
    {
      accessorKey: "valueAmount",
      header: "Order Value",
      maxSize: 80,
      cell: ({ row }) => {
        const currency: string = row.original.currencyBrief;
        return <span>{`${row.getValue("valueAmount")} ${currency}`}</span>;
      },
    },
    {
      id: "manage",
      header: "",
      size: 70,
      minSize: 70,
      maxSize: 70,
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
      minSize: 70,
      maxSize: 70,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };
        const handleDeleteClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete({ table, row });
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={TrashIcon}
              variant="secondary"
              onClick={handleDeleteClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
