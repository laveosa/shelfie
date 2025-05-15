import { ColumnDef } from "@tanstack/react-table";

export const VariantConfigurationGridColumns: ColumnDef<any>[] = [
  {
    accessorKey: "optionColor",
    header: "Type",
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
                  borderRadius: "10%",
                }
              : {}
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
    cell: ({ row }) => {
      return <div className="she-text">{row.original.traitName}</div>;
    },
  },
  {
    id: "isRemoved",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="she-subtext" style={{ textAlign: "center" }}>
          {row.original.isRemoved === true ? "Trait removed" : ""}
          {row.original.isMissing === true ? "Missing" : ""}
        </div>
      );
    },
  },
];
