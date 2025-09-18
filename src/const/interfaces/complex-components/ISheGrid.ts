import React, { PropsWithChildren } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { ISheGridHeader } from "@/const/interfaces/complex-components/ISheGridHeader.ts";
import { IGridContext } from "@/const/interfaces/context/IGridContext.ts";
import { ISheGridSkeleton } from "@/const/interfaces/complex-components/ISheGridSkeleton.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface DataWithId {
  id?: number | string;
  color?: string;
  isGridItemSelected?: boolean;
  isHidden?: boolean;
  expandableRows?: any[];
}

export interface ISheGrid<TData>
  extends ISheGridHeader,
    IGridContext,
    ISheGridSkeleton,
    PropsWithChildren {
  className?: any;
  isLoading?: boolean;
  columns: ColumnDef<TData>[];
  data?: TData[];
  sortingItems?: GridSortingModel[];
  gridRequestModel?: GridRequestModel;
  showHeader?: boolean;
  showColumnsHeader?: boolean;
  enableDnd?: boolean;
  enableExpansion?: boolean;
  customMessage?: string;
  customMessageTransKey?: string;
  skeletonQuantity?: number;
  cellPadding?: string;
  onAction?: (data) => void;
  onApplyColumns?: (data) => void;
  onDefaultColumns?: () => void;
  onGridRequestChange?: (updates) => void;
  onNewItemPosition?: (
    newIndex: number,
    activeItem: TData,
    oldIndex?: number,
  ) => void;
  renderExpandedContent?: (
    row: any,
    expandableItem: any,
    expandableIndex: number,
  ) => React.ReactNode;
  onAddExpandableRow?: (parentRowId: string | number) => void;
  createEmptyExpandableRow?: () => any;
}

export interface DndGridRef {
  hideRow: (rowId: string | number) => void;
  unhideRow: (rowId: string | number) => void;
  toggleRowVisibility: (rowId: string | number) => void;
  isRowHidden: (rowId: string | number) => boolean;
  getHiddenRows: () => (string | number)[];
}
