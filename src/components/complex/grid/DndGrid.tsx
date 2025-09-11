import React, { JSX, PropsWithChildren, useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowData,
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
import SheGridHeader from "@/components/complex/grid/she-grid-header/SheGridHeader.tsx";
import { ISheGridHeader } from "@/const/interfaces/complex-components/ISheGridHeader.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { IGridContext } from "@/const/interfaces/context/IGridContext.ts";
import { GridContext } from "@/state/context/grid-context.ts";
import cs from "./DndGrid.module.scss";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";

import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import SheGridSkeleton from "@/components/complex/grid/she-grid-skeleton/SheGridSkeleton.tsx";
import { ISheGridSkeleton } from "@/const/interfaces/complex-components/ISheGridSkeleton.ts";
import SheGridItem from "@/components/complex/grid/she-grid-item/SheGridItem.tsx";
import SheGridNoDataMessage from "@/components/complex/grid/she-grid-no-data-message/SheGridNoDataMessage.tsx";

export interface DataWithId {
  id: number | string;
  color?: string;
  isGridItemSelected?: boolean;
  isHidden?: boolean;
  expandableRows?: any[];
}

interface DataTableProps<TData extends DataWithId, TValue>
  extends ISheGridHeader,
    IGridContext,
    ISheGridSkeleton,
    PropsWithChildren {
  className?: any;
  isLoading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortingItems?: GridSortingModel[];
  gridRequestModel?: GridRequestModel;
  showHeader?: boolean;
  showColumnsHeader?: boolean;
  enableDnd?: boolean;
  enableExpansion?: boolean;
  customMessage?: string;
  customMessageTransKey?: string;
  skeletonQuantity?: number;
  cellPadding?: string;
  onAction?: (data) => void;
  onApplyColumns?: (data) => void;
  onDefaultColumns?: () => void;
  onGridRequestChange?: (updates) => void;
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

/*const DraggableRow = ({
  row,
  loadingRows,
  isDragDisabled = false,
  enableExpansion = false,
  renderExpandedContent,
  totalColumns,
  cellPadding,
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
          background: isSelected ? "#F4F4F5" : row.original.color || "#F4F4F5",
        }}
      >
        <TableCell
          className={`${isDragging ? cs.dndIconCellDragged : cs.dndIconCell} ${isSelected ? cs.isSelected : ""}`}
          style={{
            cursor: isDragDisabled || isLoading ? "default" : "grab",
            background: isSelected ? "#F4F4F5" : "inherit",
            minWidth: "24px",
            maxWidth: "24px",
            padding: "0",
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

      {/!* Render all expandable rows *!/}
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
                    background: isSelected ? "#F4F4F5" : "",
                    borderTop: "1px solid #e5e7eb",
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
};*/

/*const RegularRow = ({
  row,
  loadingRows,
  enableExpansion = false,
  renderExpandedContent,
  totalColumns,
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
            style={{
              width: `${cell.column.columnDef.size}px`,
              minWidth: cell.column.columnDef.minSize,
              maxWidth: cell.column.columnDef.maxSize,
            }}
          >
            {
              flexRender(
                cell.column.columnDef.cell,
                cell.getContext(),
              ) as JSX.Element
            }
          </TableCell>
        ))}
      </TableRow>

      {/!* Render all expandable rows *!/}
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
                      : row.original.color || "#F4F4F5",
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
};*/

export const DndGridDataTable = React.forwardRef<
  DndGridRef,
  DataTableProps<DataWithId, any>
>(function DndGridDataTable<TData extends DataWithId, TValue>(
  {
    className = "",
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
    customMessageTransKey,
    skeletonQuantity,
    gridRequestModel,
    onApplyColumns,
    onDefaultColumns,
    onNewItemPosition,
    enableDnd,
    renderExpandedContent,
    onAddExpandableRow,
    createEmptyExpandableRow,
    onGridRequestChange,
  }: DataTableProps<TData, TValue>,
  ref,
) {
  const [items, setItems] = useState<TData[]>([]);
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [activeRow, setActiveRow] = useState<Row<RowData>>(null);

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

  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);

    const id = String(event.active.id);
    const found = table
      .getRowModel()
      .rows.find((r) => String(r.original?.id) === id);

    setActiveRow(found || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveRow(null);
    setIsDragging(false);

    const { active, over } = event;

    if (!over || !active) return null;

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
        showPagination,
        showSorting,
        showColumnsViewOptions,
        showColumnsHeader,
        showSearch,
        gridModel,
        sortingItems,
        children,
        gridRequestModel,
        onDefaultColumns,
        onGridRequestChange,
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={`${className} ${cs.dndGrid}`}>
          <SheGridHeader
            table={table}
            showHeader={showHeader}
            isLoading={isLoading}
          >
            {children}
          </SheGridHeader>
          <div className={cs.dndGridContainer}>
            <Table>
              <TableHeader
                className={!showColumnsHeader ? cs.hiddenHeader : ""}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className={cs.dndGridTableHeader}
                  >
                    {enableDnd && (
                      <TableHead className="dndTriggerIcon"></TableHead>
                    )}
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{
                          ...(header.column.columnDef.size && {
                            width: `${header.column.columnDef.size}px`,
                          }),
                          minWidth: header.column.columnDef.minSize,
                          maxWidth: header.column.columnDef.maxSize,
                        }}
                      >
                        {!header.isPlaceholder && (
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <SheGridSkeleton
                quantity={skeletonQuantity}
                isLoading={isLoading}
              />
              <SheGridNoDataMessage
                items={items}
                isLoading={isLoading}
                totalColumns={totalColumns}
                customMessage={customMessage}
                customMessageTransKey={customMessageTransKey}
              />
              {!isLoading && items && items.length > 0 && (
                <SortableContext
                  items={items
                    .filter((item) => !item.isHidden)
                    .map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <TableBody className={cs.dndGridRowsBody}>
                    {table.getRowModel().rows.map((row) => (
                      <SheGridItem
                        key={row.id}
                        row={row}
                        loadingRows={loadingRows}
                        isDragDisabled={loadingRows.has(row.id) || isDragging}
                        enableDnd={enableDnd}
                        enableExpansion={enableExpansion}
                        renderExpandedContent={renderExpandedContent}
                        totalColumns={totalColumns}
                      />
                    ))}
                  </TableBody>
                </SortableContext>
              )}
            </Table>
          </div>
        </div>
        <DragOverlay
          dropAnimation={{
            duration: 140,
            easing: "ease",
          }}
          className={cs.dndGridGhostOverlay}
        >
          {activeRow && (
            <table className="w-full">
              <tbody>
                <SheGridItem
                  className={cs.dndGridGhostItem}
                  row={activeRow}
                  isDragDisabled={false}
                  enableDnd={true}
                  totalColumns={totalColumns}
                  renderExpandedContent={renderExpandedContent}
                  loadingRows={loadingRows}
                />
              </tbody>
            </table>
          )}
        </DragOverlay>
      </DndContext>
    </GridContext.Provider>
  );
});
