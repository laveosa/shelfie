import { GridDataTable } from "@/components/complex/grid/grid-data-table/GridDataTable";
import { ColumnDef, Table } from "@tanstack/react-table";
import { GridRequestModel } from "@/const/models/GridRequestModel";
import GridHeader from "@/components/complex/grid/grid-header/GridHeader";

interface ISheGrid<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  table: Table<TData>;
  gridModel: GridRequestModel;
  showHeader?: boolean;
  showPagination?: boolean;
  showSorting?: boolean;
  showColumnsViewOptions?: boolean;
  showSearch?: boolean;
}

export default function SheGrid<TData, TValue>({
  columns,
  data,
  gridModel,
  table,
  showHeader = true,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
  showSearch = true,
}: ISheGrid<TData, TValue>) {
  return (
    <>
      {showHeader && (
        <GridHeader<TData>
          gridModel={gridModel}
          table={table}
          showPagination={showPagination}
          showSorting={showSorting}
          showColumnsViewOptions={showColumnsViewOptions}
          showSearch={showSearch}
        />
      )}
      <GridDataTable columns={columns} data={data} />
    </>
  );
}
