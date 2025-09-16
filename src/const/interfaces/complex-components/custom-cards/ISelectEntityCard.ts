import { ColumnDef } from "@tanstack/react-table";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export interface ISelectEntityCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  entityName?: string;
  entityCollection?: any[];
  columns?: ColumnDef<DataWithId>[];
  onAction?: (identifier?: string, payload?: any) => void;
}
