import { GridSorting } from "@/components/complex/grid/grid-sorting/GridSorting.tsx";
import { GridPagination } from "@/components/complex/grid/grid-pagination/GridPagination.tsx";
import { ColumnsViewOptions } from "@/components/complex/grid/grid-columns-view-options/ColumnsViewOptions.tsx";
import { IGridHeader } from "@/const/interfaces/complex-components/IGridHeader.ts";
import { Input } from "@/components/ui/input.tsx";
import cs from "./GridHeader.module.scss";

export default function GridHeader<TData>({
  gridModel,
  table,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
  showSearch = true,
  children,
}: IGridHeader<TData>) {
  return (
    <div className={cs.gridHeader}>
      <div className={cs.headerGroup}>
        {showSearch && <Input />}
        {showColumnsViewOptions && <ColumnsViewOptions table={table} />}
        {showSorting && <GridSorting table={table} />}
        {children}
      </div>
      <div className={cs.headerGroup}>
        {showPagination ||
          (gridModel.pager && <GridPagination gridModel={gridModel} />)}
      </div>
    </div>
  );
}
