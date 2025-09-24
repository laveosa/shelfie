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

import cs from "./SheGrid.module.scss";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import SheGridHeader from "@/components/complex/grid/she-grid-header/SheGridHeader.tsx";
import SheGridSkeleton from "@/components/complex/grid/she-grid-skeleton/SheGridSkeleton.tsx";
import SheGridItem from "@/components/complex/grid/she-grid-item/SheGridItem.tsx";
import SheGridNoDataMessage from "@/components/complex/grid/she-grid-no-data-message/SheGridNoDataMessage.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import { GridContext } from "@/state/context/grid-context.ts";
import {
  DataWithId,
  DndGridRef,
  ISheGrid,
} from "@/const/interfaces/complex-components/ISheGrid.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export const SheGrid = React.forwardRef<DndGridRef, ISheGrid<any>>(
  function SheGrid<TData>(
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
    }: ISheGrid<TData>,
    ref,
  ) {
    // ==================================================================== STATE MANAGEMENT
    const [items, setItems] = useState<TData[]>([]);
    const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());
    const [isDragging, setIsDragging] = useState(false);
    const [activeRow, setActiveRow] = useState<Row<RowData>>(null);

    // ==================================================================== UTILITIES
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
            old.map((item: any) => (item.id === rowId ? value : item)),
          );
        },
        hideRow,
        unhideRow,
        toggleRowVisibility,
        isRowHidden,
        addExpandableRow,
      },
    });

    React.useImperativeHandle(ref, () => ({
      hideRow,
      unhideRow,
      toggleRowVisibility,
      isRowHidden,
      getHiddenRows,
    }));

    // ==================================================================== SIDE EFFECTS
    useEffect(() => {
      if (data && data.length > 0) setItems(prepareItemsForGrid(data));
    }, [data]);

    useEffect(() => {
      if (gridRequestModel && gridRequestModel.items)
        setItems(prepareItemsForGrid(gridRequestModel.items));
    }, [gridRequestModel]);

    // ==================================================================== EVENT HANDLERS
    function onGridRequestChangeHandler(model: GridRequestModel) {
      const modifiedModel = { ...model, items: null };
      onGridRequestChange?.(modifiedModel);
    }

    function onDragStartHandler(event: DragStartEvent) {
      setIsDragging(true);

      const id = String(event.active.id);
      const found = table
        .getRowModel()
        .rows.find((row: any) => String(row.original?.id) === id);

      setActiveRow(found || null);
    }

    function onDragEndHandler(event: DragEndEvent) {
      setActiveRow(null);
      setIsDragging(false);

      const { active, over } = event;

      if (!over || !active) return null;

      const activeItemId = active.id;
      const activeItem = items.find((item: any) => item.id === activeItemId);
      const oldIndex = items.findIndex((item: any) => item.id === active.id);
      const newIndex = items.findIndex((item: any) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const updatedItems = arrayMove(items, oldIndex, newIndex);
        setItems(updatedItems);
        if (onNewItemPosition) {
          onNewItemPosition(newIndex, activeItem as TData, oldIndex);
        }
      }
    }

    // ==================================================================== PRIVATE

    function hideRow(rowId: string | number) {
      setItems((prevItems) =>
        prevItems.map((item: any) =>
          item.id === rowId ? { ...item, isHidden: true } : item,
        ),
      );
    }

    function unhideRow(rowId: string | number) {
      setItems((prevItems) =>
        prevItems.map((item: any) =>
          item.id === rowId ? { ...item, isHidden: false } : item,
        ),
      );
    }

    function toggleRowVisibility(rowId: string | number) {
      setItems((prevItems) =>
        prevItems.map((item: any) =>
          item.id === rowId ? { ...item, isHidden: !item.isHidden } : item,
        ),
      );
    }

    function isRowHidden(rowId: string | number): boolean {
      const item: any = items.find((item: any) => item.id === rowId);
      return item?.isHidden || false;
    }

    function getHiddenRows(): (string | number)[] {
      return items
        .filter((item: any) => item.isHidden)
        .map((item: any) => item.id);
    }

    function prepareItemsForGrid(items: any[]): TData[] {
      return items.map((item, index) => ({
        ...item,
        id: item.id || index + 1,
        isHidden: item.isHidden || false,
        expandableRows: Array.isArray(item.expandableRows)
          ? item.expandableRows
          : [],
      }));
    }

    function addExpandableRow(parentRowId: string | number) {
      if (createEmptyExpandableRow) {
        const newExpandableRow = createEmptyExpandableRow();

        setItems((prevItems) =>
          prevItems.map((item: any) =>
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

        onAddExpandableRow?.(parentRowId);
      }
    }

    // ==================================================================== LAYOUT
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
          onGridRequestChange: onGridRequestChangeHandler,
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
        >
          <div
            className={`${className} ${cs.dndGrid} ${showColumnsHeader ? cs.dndGridWithColumnsHeader : ""} ${showHeader ? cs.dndGridWithHeader : ""}`}
          >
            <SheGridHeader
              table={table as any}
              showHeader={showHeader}
              isLoading={isLoading}
            >
              {children}
            </SheGridHeader>
            <div className={cs.dndGridContainer}>
              {!showColumnsHeader && (
                <SheLoading
                  isLoading={isLoading}
                  className={cs.dndGridLoader}
                />
              )}
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
                  <TableRow className={cs.dndGridLoaderWrapper}>
                    <TableHead>
                      <SheLoading
                        isLoading={isLoading}
                        className={cs.dndGridLoader}
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <SheGridSkeleton
                  quantity={gridRequestModel?.pageSize || skeletonQuantity}
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
                      .filter((item: any) => !item.isHidden)
                      .map((item: any) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <TableBody className={cs.dndGridRowsBody}>
                      {table.getRowModel().rows.map((row: any) => (
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
            className={cs.dndGridGhostOverlay}
            dropAnimation={{
              duration: 140,
              easing: "ease",
            }}
          >
            {activeRow && (
              <table className="w-full">
                <tbody>
                  <SheGridItem
                    className={cs.dndGridGhostItem}
                    row={activeRow as Row<DataWithId>}
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
  },
);
