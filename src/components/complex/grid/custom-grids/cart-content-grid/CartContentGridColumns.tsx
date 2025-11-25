import { ColumnDef, Row } from "@tanstack/react-table";
import { CartContentGridColumnInfoCell } from "@/components/complex/grid/custom-grids/cart-content-grid/CartContentGridColumnInfoCell.tsx";
import { CartContentGridColumnActionsCell } from "@/components/complex/grid/custom-grids/cart-content-grid/CartContentGridColumnActionsCell.tsx";

export const CartContentGridColumns = (
  onAction: (actionType: string, row?: Row<any>) => void,
): ColumnDef<any>[] => [
  {
    id: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <CartContentGridColumnInfoCell
          data={row.original}
          onAction={onAction}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    minSize: 360,
    maxSize: 360,
    cell: ({ row }) => {
      return (
        <CartContentGridColumnActionsCell
          data={row.original}
          onAction={onAction}
        />
      );
    },
  },
];
