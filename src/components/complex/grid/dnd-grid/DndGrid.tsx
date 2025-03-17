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

interface DataWithId {
  id: number | string;
}

interface DataTableProps<TData extends DataWithId, TValue>
  extends IGridHeader<TData>,
    IGridContext,
    PropsWithChildren {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortingItems?: GridSortingModel[];
  onGridRequestChange?: (updates: GridRequestModel) => void;
  showHeader?: boolean;
  showColumnsHeader?: boolean;
  enableDnd?: boolean;
  onApplyColumns?: (data) => void;
  onDefaultColumns?: () => void;
  onNewItemPosition?: (newIndex: number, activeItem: TData) => void;
}

const DraggableRow = ({ row, loadingRows, isDragDisabled = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: row.original.id,
      disabled: isDragDisabled,
    });

  const isLoading = loadingRows.has(row.id);

  return (
    <TableRow
      className={isDragging ? cs.tableRowDragged : cs.tableRow}
      ref={setNodeRef}
      {...attributes}
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      style={{
        opacity: isLoading ? 0.7 : 1,
        transform: CSS.Transform.toString(transform),
        background: isLoading ? "#EBF9EF" : "white",
      }}
    >
      <TableCell
        className={isDragging ? cs.dndIconCellDragged : cs.dndIconCell}
        style={{
          cursor: isDragDisabled || isLoading ? "default" : "grab",
          background: isDragging ? "#F8F3FF" : "white",
        }}
        {...listeners}
      >
        <div className={cs.dndIcon}>
          <GripVertical />
        </div>
      </TableCell>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          className={isDragging ? cs.tableCellDragged : cs.tableCell}
          key={cell.id}
          onClick={(e) => e.stopPropagation()}
          style={{ cursor: "default" }}
        >
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
  showColumnsHeader = true,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
  showSearch = true,
  children,
  onGridRequestChange,
  onApplyColumns,
  onDefaultColumns,
  onNewItemPosition,
  enableDnd,
}: DataTableProps<TData, TValue>) {
  const [items, setItems] = useState<TData[]>([]);
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);

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
        onNewItemPosition(newIndex, activeItem as TData);
      }
    }
  }

  const table = useReactTable<TData>({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
        <div className="rounded-md border">
          <Table style={{ overflow: "hidden" }}>
            {showColumnsHeader && (
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {enableDnd && <TableHead></TableHead>}
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
            )}
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <TableBody
                style={{ background: enableDnd ? "#f4f4f5" : "white" }}
              >
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) =>
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
                        className={
                          loadingRows.has(row.id)
                            ? "bg-green-50 opacity-70"
                            : ""
                        }
                        style={{
                          pointerEvents: loadingRows.has(row.id)
                            ? "none"
                            : "auto",
                          background: loadingRows.has(row.id)
                            ? "#EBF9EF"
                            : "white",
                          transition: "background-color 0.3s ease",
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
                    ),
                  )
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (enableDnd ? 1 : 0)}
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
    </GridContext.Provider>
  );
}
