import { ColumnDef } from "@tanstack/react-table";

export const StockHistoryGridColumns: ColumnDef<any>[] = [
  {
    accessorKey: "amountUnit",
    header: "Units",
    size: 60,
    maxSize: 60,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.amountUnit}</span>;
    },
  },
  {
    accessorKey: "actionType",
    header: "Action",
    size: 80,
    maxSize: 80,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.actionType}</span>;
    },
  },
  {
    id: "createdDate",
    header: "Date",
    size: 100,
    maxSize: 100,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.createdDate}</span>;
    },
  },
  {
    id: "status",
    header: "Status",
    size: 100,
    maxSize: 100,
    cell: ({ row }) => {
      return (
        <span className="she-text">
          <span className="she-text">{`${row.original.stockDocument.DocumentType} ${row.original.stockDocument.DocumentId}`}</span>
        </span>
      );
    },
  },
];
