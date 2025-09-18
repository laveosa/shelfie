import { ColumnDef, Row } from "@tanstack/react-table";

import SheColorPicker from "@/components/complex/she-colorpicker/SheColorpicker.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import TraitOptionsGridColumnActions from "@/components/complex/grid/trait-options-grid/TraitOptionsGridColumnActions.tsx";

export const ColorOptionsGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
    optionId?: number,
    updatedModel?: { optionColor: string; optionName: string },
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "color",
    minSize: 50,
    maxSize: 50,
    cell: ({ row }) => {
      const optionColor: string = row.original.optionColor;
      const optionName: string = row.original.optionName;
      const optionId: number = row.original.optionId;

      return (
        <div className="relative w-12 h-12 cursor-pointer">
          <SheColorPicker
            value={optionColor}
            onChange={(newColor) => {
              const updatedModel = {
                optionColor: newColor,
                optionName: optionName,
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
        </div>
      );
    },
  },
  {
    accessorKey: "optionName",
    minSize: 250,
    maxSize: 250,
    cell: ({ row }) => {
      const optionColor: string = row.original.optionColor;
      const optionName: string = row.original.optionName;
      const optionId: number = row.original.optionId;

      return (
        <SheInput
          value={optionName}
          placeholder={"Color name"}
          onBlur={(newName: string) => {
            const updatedModel = {
              optionColor: optionColor,
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
    size: 40,
    minSize: 40,
    maxSize: 40,
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
