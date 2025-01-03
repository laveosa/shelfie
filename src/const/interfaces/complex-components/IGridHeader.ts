import { Table } from "@tanstack/react-table";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IGridHeader<TData> {
  gridModel: GridRequestModel;
  table: Table<TData>;
  showPagination?: boolean;
  showSorting?: boolean;
  showColumnsViewOptions?: boolean;
  showSearch?: boolean;
}
