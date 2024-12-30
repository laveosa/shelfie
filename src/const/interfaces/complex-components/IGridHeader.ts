import { Table } from "@tanstack/react-table";

export interface IGridHeader<TData> {
  gridRequestModel: any;
  table: Table<TData>;
  showPagination?: boolean;
  showSorting?: boolean;
  showColumnsViewOptions?: boolean;
}
