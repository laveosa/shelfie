import { ColumnDef, Row } from "@tanstack/react-table";

import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import TraitOptionsGridColumnActions from "@/components/complex/grid/trait-options-grid/TraitOptionsGridColumnActions.tsx";

export const SizeOptionsGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
    optionId?: number,
    updatedModel?: { optionName: string },
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "optionName",
    header: "",
    size: 50,
    // minSize: 50,
    cell: ({ row }) => {
      const value: string = row.original.optionName || "";
      const optionId: number = row.original.optionId;

      return (
        <SheInput
          value={value}
          placeholder={"Size value"}
          onDelay={(newName: string) => {
            const updatedModel = {
              optionName: newName,
            };
            onAction(
              "updateOption",
              row.id,
              undefined,
              row,
              optionId,
              updatedModel,
            );
          }}
        />
      );
    },
  },
  {
    id: "rowActions",
    header: "",
    size: 50,
    // minSize: 50,
    cell: ({ row, table }) => {
      return (
        <TraitOptionsGridColumnActions
          row={row}
          onAction={onAction}
          table={table}
        />
      );
    },
  },
];
