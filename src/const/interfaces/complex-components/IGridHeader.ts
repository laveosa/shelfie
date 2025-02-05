import { Table } from "@tanstack/react-table";
import { GridModel } from "@/const/models/GridModel.ts";
import React from "react";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

export interface IGridHeader<TData> {
  gridModel: GridModel;
  table?: Table<TData>;
  sortingItems?: GridSortingModel[];
  showPagination?: boolean;
  showSorting?: boolean;
  showColumnsViewOptions?: boolean;
  showSearch?: boolean;
  children?: React.ReactNode;
  onSearchHandle?: () => void;
  onGridRequestChange?: (updates: GridRequestModel) => void;
}
