import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { formatDateRow } from "@/utils/helpers/quick-helper.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export function CustomerGridColumns(onAction: any): ColumnDef<any>[] {
  const { translate } = useAppTranslation();
  return [
    {
      accessorKey: "customerId",
      header: "ID",
      minSize: 40,
      maxSize: 40,
      cell: ({ row }) => (
        <span className="she-text">{row.getValue("customerId")}</span>
      ),
    },
    {
      id: "customerName",
      accessorFn: (row) => row.customerName,
      header: "Customer",
      minSize: 150,
      cell: ({ row }) => {
        const imageUrl: string = row.original.thumbnailUrl;
        return (
          <div className="flex items-center gap-4">
            <SheIcon
              icon={imageUrl || ImageIcon}
              className="m-auto"
              style={{
                ...(!imageUrl && {
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
              text={row.getValue("customerName")}
              className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className="she-text">{row.getValue("customerName")}</span>
            </SheTooltip>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      minSize: 100,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.original.email}
            className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span className="she-text">{row.original.email}</span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      minSize: 100,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.getValue("phoneNumber")}
            className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span className="she-text">{row.getValue("phoneNumber")}</span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "rank",
      header: "Rank",
      minSize: 100,
      cell: ({ row }) => {
        return <span className="she-text">{row.getValue("rank")}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string | null;
        const formattedDate = formatDateRow(
          createdAt,
          "dd-mm-yyyy hh:mm",
          "No Date",
        );
        return <span className="she-text">{formattedDate}</span>;
      },
    },
    {
      accessorKey: "lastOrderDate",
      header: "Last Order Date",
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => {
        const lastOrderDate = row.getValue("lastOrderDate") as string | null;
        const formattedDate = formatDateRow(
          lastOrderDate,
          "dd-mm-yyyy hh:mm",
          "No Orders",
        );
        return <span className="she-text">{formattedDate}</span>;
      },
    },
    {
      id: "manage",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => (
        <SheButton
          value={translate("CommonButtons.Manage")}
          onClick={() => onAction("manageCustomer", row.original)}
        />
      ),
    },
  ];
}
