import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { PropsWithChildren } from "react";

export interface IGridContext extends PropsWithChildren {
  loadingRow?: boolean;
  columnsPreferences?: any;
  preferenceContext?: any;
  onApplyColumns?: (data: any) => void;
  onDefaultColumns?: () => void;
  showColumnsHeader?: boolean;
  showPagination?: boolean;
  showSorting?: boolean;
  showColumnsViewOptions?: boolean;
  showSearch?: boolean;
  gridRequestModel?: GridRequestModel;
  sortingItems?: GridSortingModel[];
  onGridRequestChange?: (updates: GridRequestModel) => void;
}
