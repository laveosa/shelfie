import { ColumnDef, Row } from "@tanstack/react-table";

import ProductPhotosGridColumnActions from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumnActions.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

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
    cell: ({ row }) => {
      const value: string = row.original.optionName || "";
      const optionId: number = row.original.optionId;

      return (
        <SheInput
          value={value}
          placeholder={"Size value"}
          onDelay={(newName) => {
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
    cell: ({ row, table }) => {
      return (
        <ProductPhotosGridColumnActions
          row={row}
          onAction={onAction}
          table={table}
        />
      );
    },
  },
];
