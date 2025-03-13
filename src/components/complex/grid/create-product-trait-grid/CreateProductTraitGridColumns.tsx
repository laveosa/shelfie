import { ColumnDef, Row } from "@tanstack/react-table";
import ProductPhotosGridColumnActions from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumnActions.tsx";
import SheColorPicker from "@/components/complex/she-colorpicker/SheColorpicker.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export const CreateProductTraitGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<any>,
    newColor?: string,
    newName?: string,
  ) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "color",
    header: "",
    cell: ({ row }) => {
      const color: string = row.original.color || "#FFFFFF";

      return (
        <div className="relative w-12 h-12 cursor-pointer">
          <SheColorPicker
            value={color}
            onChange={(value) => {
              onAction("changeColor", row.id, undefined, row, value);
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "optionName",
    header: "",
    cell: ({ row }) => {
      const value: string = row.original.optionName || "";

      return (
        <SheInput
          value={value}
          placeholder={"Color name"}
          onDelay={(newName) => {
            onAction("changeName", row.id, undefined, row, undefined, newName);
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
