import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

interface IProductsGridPagination<TData> {
  gridRequestModel: GridRequestModel;
  table: Table<TData>;
}

export function GridPagination<TData>({
  gridRequestModel,
  table,
}: IProductsGridPagination<TData>) {
  console.log("TEST: ", gridRequestModel);
  const currentPage = gridRequestModel.pager.currentPage;
  const totalPages = gridRequestModel.pager.totalPages;

  const getPageNumbers = () => {
    const { startPage, endPage } = gridRequestModel.pager;
    const pages = [];

    // Always show the first page
    if (startPage > 1) {
      pages.push(1);
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add visible pages from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show the last page
    if (endPage < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  function getPreviousPage() {}

  function getNextPage() {}

  function setPageSize(_value) {
    // ProductsFakeData.pager.pageSize = 5;
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <SheButton
            variant="ghost"
            icon={ChevronLeft}
            onClick={() => getPreviousPage()}
            disabled={currentPage <= 1}
          >
            Previous
          </SheButton>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum: any, idx) => (
              <SheButton
                key={idx}
                variant={pageNum === currentPage ? "default" : "outline"}
                className={`h-8 w-8 p-0 ${
                  pageNum === "..." ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  setPageSize;
                }}
                disabled={pageNum === "..."}
              >
                {pageNum}
              </SheButton>
            ))}
          </div>

          <SheButton
            variant="ghost"
            icon={ChevronRight}
            iconPosition="right"
            onClick={() => getNextPage()}
            disabled={currentPage >= gridRequestModel.pager.endPage}
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
          ;
          {/* <Select
            value={gridRequestModel.pager.pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={gridRequestModel.pager.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>*/}
        </div>
      </div>
    </div>
  );
}
