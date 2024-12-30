import { GridSorting } from "@/components/complex/grid/grid-sorting/GridSorting.tsx";
import { GridPagination } from "@/components/complex/grid/grid-pagination/GridPagination.tsx";
import { ColumnsViewOptions } from "@/components/complex/grid/grid-columns-view-options/ColumnsViewOptions.tsx";
import { IGridHeader } from "@/const/interfaces/complex-components/IGridHeader.ts";

export default function GridHeader<TData>({
  gridRequestModel,
  table,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
}: IGridHeader<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {showSorting && <GridSorting table={table} />}
      {showPagination && <GridPagination gridRequestModel={gridRequestModel} />}
      {showColumnsViewOptions && <ColumnsViewOptions table={table} />}
    </div>
  );
}
