import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ImageIcon, TrashIcon } from "lucide-react";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export function PurchasesGridColumns(onAction: any): ColumnDef<any, any>[] {
  const { translate } = useAppTranslation();

  return [
    {
      accessorKey: "purchaseId",
      header: "ID",
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => (
        <span className="she-text">{row.getValue("purchaseId")}</span>
      ),
    },
    {
      id: "supplier",
      accessorFn: (row) => row.supplier,
      header: "Supplier",
      minSize: 150,
      maxSize: 200,
      cell: ({ row }) => {
        const supplier: SupplierModel = row.getValue("supplier");
        return (
          <div className="flex items-center gap-4">
            <SheIcon
              icon={supplier.thumbnailUrl || ImageIcon}
              className="m-auto"
              style={{
                ...(!supplier.thumbnailUrl && {
                  padding: "10px",
                }),
              }}
              minWidth="40px"
              maxWidth="40px"
              color="#64748b"
              iconView={IconViewEnum.BUTTON}
            />
            <SheTooltip
              delayDuration={200}
              text={supplier.supplierName}
              className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className="she-text">{supplier.supplierName}</span>
            </SheTooltip>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      minSize: 50,
      maxSize: 200,
      cell: ({ row }) => (
        <SheTooltip
          delayDuration={200}
          text={row.original.location?.address}
          className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <span className="she-text">{row.original.location?.address}</span>
        </SheTooltip>
      ),
    },
    {
      accessorKey: "documentNotes",
      header: "Notes",
      minSize: 100,
      cell: ({ row }) => (
        <SheTooltip
          delayDuration={200}
          text={row.getValue("documentNotes")}
          className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <span className="she-text">{row.getValue("documentNotes")}</span>
        </SheTooltip>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => (
        <span className="she-text">
          {formatDate(row.getValue("date"), "date")}
        </span>
      ),
    },
    {
      accessorKey: "unitsAmount",
      header: "Units",
      minSize: 70,
      maxSize: 100,
      cell: ({ row }) => (
        <span className="she-text">{`${row.getValue("unitsAmount")} units`}</span>
      ),
    },
    {
      accessorKey: "expense",
      header: "Expense",
      minSize: 70,
      maxSize: 100,
      cell: ({ row }) => (
        <span className="she-text">{`${row.getValue("expense")} ${row.original.currencyBrief}`}</span>
      ),
    },
    {
      accessorKey: "soldAmount",
      header: "Sold",
      minSize: 70,
      maxSize: 100,
      cell: ({ row }) => (
        <span className="she-text">{`${row.getValue("soldAmount")} ${row.original.currencyBrief}`}</span>
      ),
    },
    {
      accessorKey: "valueAmount",
      header: "Order Value",
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => (
        <span className="she-text">{`${row.getValue("valueAmount")} ${row.original.currencyBrief}`}</span>
      ),
    },
    {
      id: "manage",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => (
        <SheButton
          value={translate("CommonButtons.Manage")}
          onClick={() => onAction("managePurchase", row.original)}
        />
      ),
    },
    {
      id: "rowActions",
      header: "",
      minSize: 56,
      maxSize: 56,
      cell: ({ row, table }) => (
        <SheButton
          icon={TrashIcon}
          variant="secondary"
          onClick={() => onAction("deletePurchase", { table, row })}
        />
      ),
    },
  ];
}
