import { Table } from "@tanstack/react-table";
import { GridModel } from "@/const/models/GridModel.ts";
import React from "react";

export interface IGridHeader<TData> {
  gridModel: GridModel;
  table?: Table<TData>;
  showPagination?: boolean;
  showSorting?: boolean;
  showColumnsViewOptions?: boolean;
  showSearch?: boolean;
  children?: React.ReactNode;
}
