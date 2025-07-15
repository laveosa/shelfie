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

export interface DataWithId {
  id: number | string;
  color?: string;
  isGridItemSelected?: boolean;
  isHidden?: boolean;
  expandableRows?: any[];
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
  enableExpansion?: boolean;
  customMessage?: string;
  skeletonQuantity?: number;
  cellPadding?: string;
  onAction?: (data) => void;
  onApplyColumns?: (data) => void;
  onDefaultColumns?: () => void;
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
  onAddExpandableRow?: (parentRowId: string | number) => void; // Callback to add new expandable row
  createEmptyExpandableRow?: () => any; // Function to create empty expandable row model
}

export interface DndGridRef {
  hideRow: (rowId: string | number) => void;
  unhideRow: (rowId: string | number) => void;
  toggleRowVisibility: (rowId: string | number) => void;
  isRowHidden: (rowId: string | number) => boolean;
  getHiddenRows: () => (string | number)[];
}

const DraggableRow = ({
  row,
  loadingRows,
  isDragDisabled = false,
  enableExpansion = false,
  renderExpandedContent,
  totalColumns,
  cellPadding = "8px 12px",
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: row.original.id,
      disabled: isDragDisabled,
    });

  const isLoading = loadingRows.has(row.id);
  const isSelected = row.original.isGridItemSelected;
  const isHidden = row.original.isHidden;
  const expandableRows = row.original.expandableRows || [];

  if (isHidden) {
    return null;
  }

  return (
    <>
      <TableRow
        className={`${isDragging ? cs.tableRowDragged : cs.tableRow} ${isSelected ? cs.isSelected : ""}`}
        ref={setNodeRef}
        {...attributes}
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        style={{
          opacity: isLoading ? 0.7 : 1,
          transform: CSS.Transform.toString(transform),
          background: isSelected ? "#F4F4F5" : row.original.color || "white",
        }}
      >
        <TableCell
          className={`${isDragging ? cs.dndIconCellDragged : cs.dndIconCell} ${isSelected ? cs.isSelected : ""}`}
          style={{
            cursor: isDragDisabled || isLoading ? "default" : "grab",
            background: isSelected ? "#F4F4F5" : "inherit",
            width: "30px",
            minWidth: "30px",
            maxWidth: "30px",
            padding: cellPadding,
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
              background: isSelected ? "#F4F4F5" : "inherit",
              minWidth: cell.column.columnDef.minSize || 50,
              maxWidth: cell.column.columnDef.maxSize,
              padding: cellPadding,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      {/* Render all expandable rows */}
      {enableExpansion &&
        expandableRows.length > 0 &&
        renderExpandedContent && (
          <>
            {expandableRows.map((expandableItem, index) => (
              <TableRow
                key={`${row.id}-expanded-${index}`}
                className={`${cs.expandedRow} ${isSelected ? cs.isSelected : ""}`}
              >
                <TableCell
                  colSpan={totalColumns}
                  className={cs.expandedContent}
                  style={{
                    background: isSelected
                      ? "#F4F4F5"
                      : row.original.color || "white", // Use parent row color
                    borderTop: "1px solid #e5e7eb",
                    // padding: "16px",
                    padding: cellPadding,
                  }}
                >
                  {renderExpandedContent(row, expandableItem, index)}
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
    </>
  );
};

const RegularRow = ({
  row,
  loadingRows,
  enableExpansion = false,
  renderExpandedContent,
  totalColumns,
  cellPadding = "8px 12px",
}) => {
  const isLoading = loadingRows.has(row.id);
  const isSelected = row.original.isGridItemSelected;
  const isHidden = row.original.isHidden;
  const expandableRows = row.original.expandableRows || [];

  if (isHidden) {
    return null;
  }

  return (
    <>
      <TableRow
        key={row.id}
        className={`${
          isLoading ? "bg-green-50 opacity-70" : ""
        } ${isSelected ? cs.isSelected : ""}`}
        style={{
          pointerEvents: isLoading ? "none" : "auto",
          background: isSelected ? "#F4F4F5" : row.original.color,
          borderBottom: expandableRows.length > 0 ? "none" : "",
        }}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className={`${cs.tableCell} ${isSelected ? cs.isSelected : ""}`}
            style={{
              background: isSelected ? "#F4F4F5" : "inherit",
              ...(cell.column.columnDef.size && {
                width: `${cell.column.columnDef.size}px`,
              }),
              minWidth: cell.column.columnDef.minSize || 50,
              maxWidth: cell.column.columnDef.maxSize,
              padding: cellPadding,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      {/* Render all expandable rows */}
      {enableExpansion &&
        expandableRows.length > 0 &&
        renderExpandedContent && (
          <>
            {expandableRows.map((expandableItem, index) => (
              <TableRow
                key={`${row.id}-expanded-${index}`}
                className={`${cs.expandedRow} ${isSelected ? cs.isSelected : ""}`}
              >
                <TableCell
                  colSpan={totalColumns}
                  className={cs.expandedContent}
                  style={{
                    background: isSelected
                      ? "#F4F4F5"
                      : row.original.color || "white",
                    borderTop:
                      expandableRows.length > 1 ? "1px solid white" : "",
                    padding: cellPadding,
                  }}
                >
                  {renderExpandedContent(row, expandableItem, index)}
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
    </>
  );
};

export const DndGridDataTable = React.forwardRef<
  DndGridRef,
  DataTableProps<DataWithId, any>
>(function DndGridDataTable<TData extends DataWithId, TValue>(
  {
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
    enableExpansion = false,
    children,
    customMessage,
    skeletonQuantity,
    cellPadding = "8px 12px",
    onGridRequestChange,
    onApplyColumns,
    onDefaultColumns,
    onNewItemPosition,
    enableDnd,
    renderExpandedContent,
    onAddExpandableRow,
    createEmptyExpandableRow,
  }: DataTableProps<TData, TValue>,
  ref,
) {
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
        id: item.id || index + 1,
        isHidden: item.isHidden || false,
        expandableRows: Array.isArray(item.expandableRows)
          ? item.expandableRows
          : [],
      }));
    }

    if (data && data.length > 0) {
      setItems(prepareItemsForGrid(data));
    }
  }, [data]);

  const hideRow = (rowId: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === rowId ? { ...item, isHidden: true } : item,
      ),
    );
  };

  const unhideRow = (rowId: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === rowId ? { ...item, isHidden: false } : item,
      ),
    );
  };

  const toggleRowVisibility = (rowId: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === rowId ? { ...item, isHidden: !item.isHidden } : item,
      ),
    );
  };

  const isRowHidden = (rowId: string | number): boolean => {
    const item = items.find((item) => item.id === rowId);
    return item?.isHidden || false;
  };

  const getHiddenRows = (): (string | number)[] => {
    return items.filter((item) => item.isHidden).map((item) => item.id);
  };

  React.useImperativeHandle(ref, () => ({
    hideRow,
    unhideRow,
    toggleRowVisibility,
    isRowHidden,
    getHiddenRows,
  }));

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

  const handleAddExpandableRow = (parentRowId: string | number) => {
    if (createEmptyExpandableRow) {
      const newExpandableRow = createEmptyExpandableRow();

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === parentRowId
            ? {
                ...item,
                expandableRows: [
                  ...(item.expandableRows || []),
                  newExpandableRow,
                ],
              }
            : item,
        ),
      );

      if (onAddExpandableRow) {
        onAddExpandableRow(parentRowId);
      }
    }
  };

  const totalColumns = columns.length + (enableDnd ? 1 : 0);

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
      hideRow,
      unhideRow,
      toggleRowVisibility,
      isRowHidden,
      addExpandableRow: handleAddExpandableRow,
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
              tableLayout: "fixed",
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
                          width: "30px",
                          minWidth: "30px",
                          maxWidth: "30px",
                          padding: cellPadding,
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
                          padding: cellPadding,
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
            {/*{isLoading && items.length === 0 ? (*/}
            {isLoading ? (
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
                items={items
                  .filter((item) => !item.isHidden)
                  .map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {data?.length > 0 ? (
                  <TableBody
                    className={cs.tableBody}
                    style={{
                      background: enableDnd ? "#f4f4f5" : "white",
                    }}
                  >
                    {table
                      .getRowModel()
                      .rows.map((row) =>
                        enableDnd ? (
                          <DraggableRow
                            key={row.id}
                            row={row}
                            loadingRows={loadingRows}
                            isDragDisabled={
                              loadingRows.has(row.id) || isDragging
                            }
                            enableExpansion={enableExpansion}
                            renderExpandedContent={renderExpandedContent}
                            totalColumns={totalColumns}
                            cellPadding={cellPadding}
                          />
                        ) : (
                          <RegularRow
                            key={row.id}
                            row={row}
                            loadingRows={loadingRows}
                            enableExpansion={enableExpansion}
                            renderExpandedContent={renderExpandedContent}
                            totalColumns={totalColumns}
                            cellPadding={cellPadding}
                          />
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
                        colSpan={totalColumns}
                        className="h-24 text-center"
                        style={{
                          width: "100%",
                          padding: cellPadding,
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
});
