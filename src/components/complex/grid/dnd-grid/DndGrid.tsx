import React, { PropsWithChildren, useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
import cs from "./DndGrid.module.scss";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";

interface DataWithId {
  id: number | string;
  color?: string;
  isGridItemSelected?: boolean;
}

interface DataTableProps<TData extends DataWithId, TValue>
  extends IGridHeader<TData>,
    IGridContext,
    PropsWithChildren {
  className?: any;
  isLoading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortingItems?: GridSortingModel[];
  onGridRequestChange?: (updates: GridRequestModel) => void;
  showHeader?: boolean;
  showColumnsHeader?: boolean;
  enableDnd?: boolean;
  customMessage?: string;
  skeletonQuantity?: number;
  onAction?: (data) => void;
  onApplyColumns?: (data) => void;
  onDefaultColumns?: () => void;
  onNewItemPosition?: (
    newIndex: number,
    activeItem: TData,
    oldIndex?: number,
  ) => void;
}

const DraggableRow = ({ row, loadingRows, isDragDisabled = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: row.original.id,
      disabled: isDragDisabled,
    });

  const isLoading = loadingRows.has(row.id);
  const isSelected = row.original.isGridItemSelected;

  return (
    <TableRow
      className={`${isDragging ? cs.tableRowDragged : cs.tableRow} ${isSelected ? cs.isSelected : ""}`}
      ref={setNodeRef}
      {...attributes}
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      style={{
        opacity: isLoading ? 0.7 : 1,
        transform: CSS.Transform.toString(transform),
        background: isSelected ? "#F8F3FF" : row.original.color || "white",
      }}
    >
      <TableCell
        className={`${isDragging ? cs.dndIconCellDragged : cs.dndIconCell} ${isSelected ? cs.isSelected : ""}`}
        style={{
          cursor: isDragDisabled || isLoading ? "default" : "grab",
          background: isSelected ? "#F8F3FF" : "inherit",
          width: "40px",
          minWidth: "40px",
          maxWidth: "40px",
        }}
        {...listeners}
      >
        <div className={cs.dndIcon}>
          <GripVertical />
        </div>
      </TableCell>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          className={`${isDragging ? cs.tableCellDragged : cs.tableCell} ${isSelected ? cs.isSelected : ""}`}
          key={cell.id}
          onClick={(e) => e.stopPropagation()}
          style={{
            cursor: "default",
            background: isSelected ? "#F8F3FF" : "inherit",
            minWidth: cell.column.columnDef.minSize || 50,
            maxWidth: cell.column.columnDef.maxSize,
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export function DndGridDataTable<TData extends DataWithId, TValue>({
  className,
  columns,
  data,
  columnsPreferences,
  preferenceContext,
  gridModel,
  sortingItems,
  isLoading,
  showHeader = true,
  showColumnsHeader = true,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
  showSearch = true,
  children,
  customMessage,
  skeletonQuantity,
  onGridRequestChange,
  onApplyColumns,
  onDefaultColumns,
  onNewItemPosition,
  enableDnd,
}: DataTableProps<TData, TValue>) {
  const [items, setItems] = useState<TData[]>([]);
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);

  function createSkeletonArray(quantity: number): object[] {
    return Array.from({ length: quantity }, () => ({}));
  }

  useEffect(() => {
    function prepareItemsForGrid(data: any): TData[] {
      return data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    }

    if (data && data.length > 0) {
      setItems(prepareItemsForGrid(data));
    }
  }, [data]);

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd(event) {
    setIsDragging(false);
    const { active, over } = event;

    if (!over || !active) {
      return;
    }
    const activeItemId = active.id;
    const activeItem = items.find((item) => item.id === activeItemId);

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const updatedItems = arrayMove(items, oldIndex, newIndex);
      setItems(updatedItems);
      if (onNewItemPosition) {
        onNewItemPosition(newIndex, activeItem as TData, oldIndex);
      }
    }
  }

  const table = useReactTable<TData>({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageSize: gridModel?.pager?.pageSize || 10,
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
      updateData: (rowId: string, value: TData) => {
        setItems((old) =>
          old.map((item) => (item.id === rowId ? value : item)),
        );
      },
    },
  });

  return (
    <GridContext.Provider
      value={{
        columnsPreferences,
        preferenceContext,
        onApplyColumns,
        onDefaultColumns,
        showPagination,
        showSorting,
        showColumnsViewOptions,
        showColumnsHeader,
        showSearch,
        gridModel,
        onGridRequestChange,
        sortingItems,
        children,
      }}
    >
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        {showHeader && <GridHeader table={table}>{children}</GridHeader>}
        <div
          className={`${className} rounded-md border`}
          style={{ position: "relative" }}
        >
          {isLoading && (
            <SheLoading style={showColumnsHeader ? {} : { top: "0px" }} />
          )}
          <Table
            className={
              isLoading ? `${cs.table} ${cs.tableLoading}` : `${cs.table}`
            }
            style={{
              width: "100%",
              tableLayout: "auto",
              borderCollapse: "collapse",
            }}
          >
            {showColumnsHeader && (
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    className={isLoading ? `${cs.tableRowLoading}` : ""}
                    key={headerGroup.id}
                  >
                    {enableDnd && (
                      <TableHead
                        className={isLoading ? `${cs.tableHeadLoading}` : ""}
                        style={{
                          width: "40px",
                          minWidth: "40px",
                          maxWidth: "40px",
                        }}
                      ></TableHead>
                    )}
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        className={isLoading ? `${cs.tableHeadLoading}` : ""}
                        key={header.id}
                        style={{
                          ...(header.column.columnDef.size && {
                            width: `${header.column.columnDef.size}px`,
                          }),
                          minWidth: header.column.columnDef.minSize || 50,
                          maxWidth: header.column.columnDef.maxSize,
                        }}
                      >
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
            )}
            {isLoading && items.length === 0 ? (
              <TableBody className={cs.tableSkeleton}>
                {createSkeletonArray(skeletonQuantity ?? 5).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className={cs.skeletonRound} />
                    </TableCell>
                    <TableCell className={cs.skeletonBarsContainer}>
                      <div className="space-y-2">
                        <Skeleton
                          className={cs.skeletonLongBar}
                          style={{ width: "100%" }}
                        />
                        <Skeleton
                          className={cs.skeletonShortBar}
                          style={{ width: "70%" }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {data.length > 0 ? (
                  <TableBody
                    className={cs.tableBody}
                    style={{
                      background: enableDnd ? "#f4f4f5" : "white",
                    }}
                  >
                    {table.getRowModel().rows.map((row) =>
                      enableDnd ? (
                        <DraggableRow
                          key={row.id}
                          row={row}
                          loadingRows={loadingRows}
                          isDragDisabled={loadingRows.has(row.id) || isDragging}
                        />
                      ) : (
                        <TableRow
                          key={row.id}
                          className={`${
                            loadingRows.has(row.id)
                              ? "bg-green-50 opacity-70"
                              : ""
                          } ${row.original.isGridItemSelected ? cs.isSelected : ""}`}
                          style={{
                            pointerEvents: loadingRows.has(row.id)
                              ? "none"
                              : "auto",
                            background: row.original.isGridItemSelected
                              ? "#F8F3FF"
                              : row.original.color,
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className={`${cs.tableCell} ${row.original.isGridItemSelected ? cs.isSelected : ""}`}
                              style={{
                                background: row.original.isGridItemSelected
                                  ? "#F8F3FF"
                                  : "inherit",
                                ...(cell.column.columnDef.size && {
                                  width: `${cell.column.columnDef.size}px`,
                                }),
                                minWidth: cell.column.columnDef.minSize || 50,
                                maxWidth: cell.column.columnDef.maxSize,
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                ) : (
                  <TableBody
                    className={cs.tableBody}
                    style={{
                      background: enableDnd ? "#f4f4f5" : "white",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + (enableDnd ? 1 : 0)}
                        className="h-24 text-center"
                        style={{
                          width: "100%",
                        }}
                      >
                        {customMessage || "NO DATA TO DISPLAY"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </SortableContext>
            )}
          </Table>
        </div>
      </DndContext>
    </GridContext.Provider>
  );
}
