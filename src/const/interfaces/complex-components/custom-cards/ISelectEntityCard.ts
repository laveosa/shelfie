import { ColumnDef } from "@tanstack/react-table";
import { DataWithId } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";

export interface ISelectEntityCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  entityName?: string;
  entityCollection?: any[];
  columns?: ColumnDef<DataWithId>[];
  onAction?: (identifier?: string, payload?: any) => void;
}
