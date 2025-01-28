import React, { PropsWithChildren, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import GridHeader from "@/components/complex/grid/grid-header/GridHeader.tsx";
import { IGridHeader } from "@/const/interfaces/complex-components/IGridHeader.ts";
import { GridContext } from "@/state/context/grid-context.ts";
import { IGridContext } from "@/const/interfaces/contexts/IGridContext.ts";

interface DataTableProps<TData, TValue>
  extends IGridHeader<TData>,
    IGridContext,
    PropsWithChildren {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showHeader?: boolean;
}

export function GridDataTable<TData, TValue>({
  columns,
  data,
  gridModel,
  columnsPreferences,
  showHeader = true,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
  showSearch = true,
  children,
  onApplyColumns,
  onDefaultColumns,
}: DataTableProps<TData, TValue>) {
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      setLoadingRow: (rowId: string, loading: boolean) => {
        setLoadingRows((prev) => {
          const newSet = new Set(prev);
          if (loading) {
            newSet.add(rowId);
          } else {
            newSet.delete(rowId);
          }
          return newSet;
        });
      },
      isRowLoading: (rowId: string) => loadingRows.has(rowId),
    },
  });

  return (
    <GridContext.Provider
      value={{
        columnsPreferences,
        onApplyColumns,
        onDefaultColumns,
      }}
    >
      <div>
        {showHeader && (
          <GridHeader
            gridModel={gridModel}
            table={table}
            columnsPreferences={columnsPreferences}
            showPagination={showPagination}
            showSorting={showSorting}
            showColumnsViewOptions={showColumnsViewOptions}
            showSearch={showSearch}
          >
            {children}
          </GridHeader>
        )}
        <div className="rounded-md border">
          <Table style={{ overflow: "hidden" }}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={
                      loadingRows.has(row.id) ? "bg-green-50 opacity-70" : ""
                    }
                    style={{
                      pointerEvents: loadingRows.has(row.id) ? "none" : "auto",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    NO DATA TO DISPLAY
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </GridContext.Provider>
  );
}
