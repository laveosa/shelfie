import { ColumnDef } from "@tanstack/react-table";

export const VariantConfigurationGridColumns: ColumnDef<any>[] = [
  {
    accessorKey: "optionColor",
    header: "Type",
    size: 100,
    maxSize: 100,
    minSize: 100,
    cell: ({ row }) => {
      return (
        <span className="she-text">
          {row.original.optionColor === null ? "Size" : "Color"}
        </span>
      );
    },
  },
  {
    accessorKey: "optionName",
    header: "Value",
    size: 100,
    maxSize: 100,
    minSize: 100,
    cell: ({ row }) => {
      return (
        <div
          className={row.original.optionColor === null ? "she-text" : ""}
          style={
            row.original.optionColor
              ? {
                  background: row.original.optionColor,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  alignSelf: "center",
                }
              : { alignSelf: "center" }
          }
        >
          {row.original.optionColor === null ? row.original.optionName : ""}
        </div>
      );
    },
  },
  {
    id: "traitName",
    header: "Name",
    size: 100,
    maxSize: 100,
    minSize: 100,
    cell: ({ row }) => {
      return <div className="she-text">{row.original.traitName}</div>;
    },
  },
];
