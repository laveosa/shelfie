import { ColumnDef } from "@tanstack/react-table";

export const StockHistoryGridColumns: ColumnDef<any>[] = [
  {
    accessorKey: "amountUnit",
    header: "Units",
    cell: ({ row }) => {
      return <span className="she-text">{row.original.amountUnit}</span>;
    },
  },
  {
    accessorKey: "actionType",
    header: "Action",
    cell: ({ row }) => {
      return <span className="she-text">{row.original.actionType}</span>;
    },
  },
  {
    id: "createdDate",
    header: "Date",
    cell: ({ row }) => {
      return <span className="she-text">{row.original.createdDate}</span>;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      return <span className="she-text">{row.original.status}</span>;
    },
  },
];
