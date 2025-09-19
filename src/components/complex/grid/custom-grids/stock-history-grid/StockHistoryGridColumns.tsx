import { ColumnDef } from "@tanstack/react-table";

export const StockHistoryGridColumns: ColumnDef<any>[] = [
  {
    accessorKey: "amountUnit",
    header: "Units",
    minSize: 60,
    maxSize: 60,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.amountUnit}</span>;
    },
  },
  {
    accessorKey: "actionType",
    header: "Action",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.actionType}</span>;
    },
  },
  {
    id: "createdDate",
    header: "Date",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.createdDate}</span>;
    },
  },
  {
    id: "status",
    header: "Status",
    minSize: 100,
    cell: ({ row }) => {
      return (
        <span className="she-text">
          <span className="she-text">{`${row.original.stockDocument.DocumentType} ${row.original.stockDocument.DocumentId}`}</span>
        </span>
      );
    },
  },
];
