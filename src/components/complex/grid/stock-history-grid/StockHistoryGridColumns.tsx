import { ColumnDef } from "@tanstack/react-table";

export const StockHistoryGridColumns: ColumnDef<any>[] = [
  {
    accessorKey: "units",
    header: "Units",
    cell: ({ row }) => {
      return <span className="she-text">{row.original}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <span className="she-text">{row.original}</span>;
    },
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => {
      return <span className="she-text">{row.original}</span>;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      return <span className="she-text">{row.original}</span>;
    },
  },
];
