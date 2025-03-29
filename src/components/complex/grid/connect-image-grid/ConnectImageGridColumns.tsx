import { ColumnDef, Row } from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch.tsx";

interface IConnectImageGridColumns {
  isActive: boolean;
  variant: string;
  details: any;
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IConnectImageGridColumns>,
  ) => void;
}

export const ConnectImageGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <Switch
          disabled={meta?.isRowLoading(row.id)}
          checked={row.getValue("isActive")}
          onCheckedChange={() =>
            onAction("toggleActive", row.id, meta?.setLoadingRow)
          }
        />
      );
    },
  },
  {
    accessorKey: "variant",
    header: "Variant",
    cell: ({ row }) => {
      return <span className="she-text">${row.original.variant}</span>;
    },
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => {
      return (
        <>
          <div
            style={{
              background: row.original.details.color,
              width: "19px",
              height: "19px",
              borderRadius: "50%",
            }}
          ></div>
          <span className="she-text">{row.original.details.name}</span>
        </>
      );
    },
  },
];
