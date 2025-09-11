import { flexRender } from "@tanstack/react-table";
import React, { JSX } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Arguments } from "@dnd-kit/sortable/dist/hooks/useSortable";

import { GripVertical } from "lucide-react";
import cs from "./SheGridItem.module.scss";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { ISheGridItem } from "@/const/interfaces/complex-components/ISheGridItem.ts";

export default function SheGridItem({
  className = "",
  row,
  isDragDisabled,
  loadingRows,
  enableDnd,
  enableExpansion,
  renderExpandedContent,
  totalColumns,
}: ISheGridItem): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: row.original.id,
      disabled: isDragDisabled,
    } as Arguments);

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
        className={`${cs.sheGridItem} ${className} ${isSelected ? cs.sheGridItemSelected : ""} ${isDragging ? cs.sheGridItemDragging : ""} ${isLoading ? "disabled" : ""}`}
        key={row.id}
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
        }}
        {...attributes}
      >
        {enableDnd && (
          <TableCell className="dndTriggerIcon" {...listeners}>
            <div className={cs.dndIcon}>
              <GripVertical />
            </div>
          </TableCell>
        )}
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            style={{
              minWidth: cell.column.columnDef.minSize,
              maxWidth: cell.column.columnDef.maxSize,
            }}
            onClick={(e) => e.stopPropagation()}
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
      {enableExpansion &&
        expandableRows.length > 0 &&
        renderExpandedContent && (
          <>
            {expandableRows.map((expandableItem, index) => (
              <TableRow
                key={`${row.id}-expanded-${index}`}
                className={cs.sheGridItem}
              >
                <TableCell colSpan={totalColumns}>
                  {renderExpandedContent(row, expandableItem, index)}
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
    </>
  );
}
