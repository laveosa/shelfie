import { ColumnDef } from "@tanstack/react-table";

export interface ISelectEntityCard<T> {
  isLoading?: boolean;
  isGridLoading?: boolean;
  entityName?: string;
  entityCollection?: any[];
  columns?: ColumnDef<T>[];
  onAction?: (identifier?: string, payload?: any) => void;
}
