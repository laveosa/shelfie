import { ColumnDef, Row } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { CogIcon } from "lucide-react";

export function customerAddressGridColumns(
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
  ) => void,
): ColumnDef<any>[] {
  return [
    {
      accessorKey: "addressId",
      header: "ID",
      minSize: 60,
      maxSize: 60,
    },
    {
      id: "alias",
      accessorFn: (row) => row.alias,
      header: "Alias",
      minSize: 150,
      cell: ({ row }) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              <SheTooltip
                delayDuration={200}
                text={row.getValue("alias")}
                className="max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span>{row.getValue("alias")}</span>
              </SheTooltip>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "city",
      header: "City",
      minSize: 100,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.original.city}
            className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span>{row.original.city}</span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "addressLine1",
      header: "Address",
      minSize: 100,
      cell: ({ row }) => {
        return (
          <SheTooltip
            delayDuration={200}
            text={row.getValue("addressLine1")}
            className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span>{row.getValue("addressLine1")}</span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "postalCode",
      header: "Postal Code",
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => {
        return <span>{row.getValue("postalCode")}</span>;
      },
    },
    {
      id: "manage",
      header: "",
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
          onAction("manageCustomerAddress", row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={CogIcon}
              variant="secondary"
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
