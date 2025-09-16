import { ColumnDef } from "@tanstack/react-table";
import { DataWithId } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";

export interface ISelectPurchaseCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  purchases?: any[];
  columns?: ColumnDef<DataWithId>[];
  onAction?: (identifier?: string, payload?: any) => void;
}
