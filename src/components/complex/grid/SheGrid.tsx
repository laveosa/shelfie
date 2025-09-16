import React, { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import SheGridHeader from "@/components/complex/grid/she-grid-header/SheGridHeader.tsx";
import { GridContext } from "@/state/context/grid-context.ts";
import cs from "./SheGrid.module.scss";

import SheGridSkeleton from "@/components/complex/grid/she-grid-skeleton/SheGridSkeleton.tsx";
import SheGridItem from "@/components/complex/grid/she-grid-item/SheGridItem.tsx";
import SheGridNoDataMessage from "@/components/complex/grid/she-grid-no-data-message/SheGridNoDataMessage.tsx";
import {
  DataWithId,
  DndGridRef,
  ISheGrid,
} from "@/const/interfaces/complex-components/ISheGrid.ts";

export const DndGridDataTable = React.forwardRef<
  DndGridRef,
  ISheGrid<DataWithId, any>
>(function DndGridDataTable<TData extends DataWithId, TValue>(
  {
    className = "",
    columns,
    data,
    columnsPreferences,
    preferenceContext,
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
  }: ISheGrid<TData, TValue>,
  ref,
) {
  const [items, setItems] = useState<TData[]>([]);
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [activeRow, setActiveRow] = useState<Row<RowData>>(null);

  useEffect(() => {
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
        pageSize: gridRequestModel?.pageSize || 10,
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
