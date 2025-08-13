import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ImageIcon, TrashIcon } from "lucide-react";
import { formatDate, formatDateRow } from "@/utils/helpers/quick-helper.ts";

export function customerGridColumns(
  onAction: any,
): ColumnDef<any>[] {
  return [
    {
      accessorKey: "customerId",
      header: "ID",
      size: 20,
      minSize: 20,
      maxSize: 20,
    },
    {
      id: "customerName",
      accessorFn: (row) => row.customerName,
      header: "Customer",
      size: 150,
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => {
        const imageUrl: string = row.original.thumbnailUrl;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl || placeholderImage}
                  alt={row.original.customerName || "Customer"}
                  className="object-cover rounded-md w-12 h-12"
                />
              ) : (
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              )}
            </div>
            <div>
              <SheTooltip
                delayDuration={200}
                text={row.getValue("customerName")}
                className="max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span>{row.getValue("customerName")}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 100,
      minSize: 100,
      maxSize: 200,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.original.email}
            className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span>{row.original.email}</span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      size: 100,
      minSize: 100,
      maxSize: 200,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.getValue("phoneNumber")}
            className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span>{row.getValue("phoneNumber")}</span>
          </SheTooltip>
        );
      },
    },
    {
    accessorKey: "rank",
      header: "Rank",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        return <span>{row.getValue("rank")}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      size: 70,
      minSize: 70,
      maxSize: 70,
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string | null;
        const formattedDate = formatDateRow(createdAt, "dd-mm-yyyy hh:mm", "No Date");
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "lastOrderDate",
      header: "Last Order Date",
      size: 70,
      minSize: 70,
      maxSize: 70,
      cell: ({ row }) => {
        const lastOrderDate = row.getValue("lastOrderDate") as string | null;
        const formattedDate = formatDateRow(lastOrderDate, "dd-mm-yyyy hh:mm", "No Orders");
        return <span>{formattedDate}</span>;
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
          onAction("manageCustomer", row.id, meta?.setLoadingRow, row.original);
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
    
  ];
}
