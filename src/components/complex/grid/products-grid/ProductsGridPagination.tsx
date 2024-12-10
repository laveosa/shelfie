import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import SheButton from "@/components/primitive/she-button/SheButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function ProductsGridPagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if at the start or end
    if (currentPage <= 1) end = Math.min(maxVisiblePages, totalPages - 1);
    if (currentPage >= totalPages - 1)
      start = Math.max(2, totalPages - maxVisiblePages + 1);

    // Add ellipsis if needed
    if (start > 2) pages.push("...");

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) pages.push("...");

    // Add last page if there is more than one page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <SheButton
            variant="outline"
            icon={ChevronLeft}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </SheButton>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum, idx) => (
              <Button
                key={idx}
                variant={pageNum === currentPage ? "default" : "outline"}
                className={`h-8 w-8 p-0 ${
                  pageNum === "..." ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  if (typeof pageNum === "number") {
                    table.setPageIndex(pageNum - 1);
                  }
                }}
                disabled={pageNum === "..."}
              >
                {pageNum}
              </Button>
            ))}
          </div>

          <SheButton
            variant="outline"
            icon={ChevronRight}
            iconPosition="right"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </SheButton>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
