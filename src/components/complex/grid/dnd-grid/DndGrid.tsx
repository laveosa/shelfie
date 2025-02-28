import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { IGridContext } from "@/const/interfaces/context/IGridContext.ts";
import { GridContext } from "@/state/context/grid-context";

interface DataWithId {
  id: number;
}

interface DataTableProps<TData extends DataWithId, TValue>
  extends IGridHeader<TData>,
    IGridContext,
    PropsWithChildren {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortingItems?: GridSortingModel[];
  onGridRequestChange?: (updates: GridRequestModel) => void;
  itemId?: string;
  showHeader?: boolean;
  enableDnd?: boolean;
  onApplyColumns?: (data) => void;
  onDefaultColumns?: () => void;
}

const SortableHandle = ({ listeners }) => {
  return (
    <TableCell
      {...listeners}
      style={{
        cursor: "grab",
        width: "40px",
        textAlign: "center",
      }}
    >
      <button className="DragHandle" {...listeners}>
        <svg viewBox="0 0 20 20" width="12">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
        </svg>
      </button>
    </TableCell>
  );
};

const DraggableRow = ({ row, loadingRows }) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useSortable({
      id: row.original.id,
    });

  return (
    <TableRow
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className={`
        ${isDragging ? "bg-blue-100 shadow-lg" : ""} 
        ${loadingRows.has(row.id) ? "bg-green-50 opacity-70" : ""} 
      `}
      style={{
        transform: CSS.Transform.toString(transform),
        background: "white",
      }}
    >
      <SortableHandle listeners={listeners} />
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export function DndGridDataTable<TData extends DataWithId, TValue>({
  columns,
  data,
  columnsPreferences,
  gridModel,
  sortingItems,
  showHeader = true,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
  showSearch = true,
  itemId,
  children,
  onGridRequestChange,
  onApplyColumns,
  onDefaultColumns,
  enableDnd,
}: DataTableProps<TData, TValue>) {
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<TData[]>([]);

  useEffect(() => {
    setItems(data);
    if (!data[0]?.id) {
      const updatedItems = data.map((item, index) => ({
        ...item,
        id: itemId[index],
      }));
      setItems(updatedItems);
    }
  }, [data]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (!over) {
      return;
    }

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const updatedItems = arrayMove(items, oldIndex, newIndex);
      setItems(updatedItems);
    }
  };

  const table = useReactTable<TData>({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: gridModel.pager.pageSize,
      },
    },
    manualPagination: true,
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
        showPagination,
        showSorting,
        showColumnsViewOptions,
        showSearch,
        gridModel,
        onGridRequestChange,
        sortingItems,
        children,
      }}
    >
      {enableDnd ? (
        <DndContext onDragEnd={handleDragEnd}>
          {showHeader && <GridHeader table={table}>{children}</GridHeader>}
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
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <TableBody style={{ background: "#f4f4f5" }}>
                  {table.getRowModel().rows?.length ? (
                    table
                      .getRowModel()
                      .rows.map((row) => (
                        <DraggableRow
                          key={row.id}
                          row={row}
                          loadingRows={loadingRows}
                        />
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
              </SortableContext>
            </Table>
          </div>
        </DndContext>
      ) : (
        <>
          {showHeader && <GridHeader table={table}>{children}</GridHeader>}
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
                    <TableRow key={row.id}>
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
        </>
      )}
    </GridContext.Provider>
  );
}
