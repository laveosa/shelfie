import { GridModel } from "@/const/models/GridModel.ts";
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
  gridModel: GridModel;
  onGridRequestChange?: (updates: GridRequestModel) => void;
  sortingItems?: GridSortingModel[];
}
