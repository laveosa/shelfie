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
import cs from "./GridPagination.module.scss";

interface IProductsGridPagination {
  gridModel: GridRequestModel;
}

export function GridPagination({
  gridModel: gridModel,
}: IProductsGridPagination) {
  const { currentPage, totalPages, pageSize } = gridModel.pager;

  const getPageNumbers = () => {
    const pages = [];

    // Always show the first page
    if (currentPage > 1) {
      pages.push(1);
    }

    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around the current page
    if (currentPage > 1) {
      pages.push(currentPage - 1); // One page before
    }

    pages.push(currentPage); // Current page

    if (currentPage < totalPages) {
      pages.push(currentPage + 1); // One page after
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  function getPreviousPage() {}

  function getNextPage() {}

  function setCurrentPage(e) {
    console.log(e.target.innerText);
  }

  function setPageSize(pageSize) {
    console.log(pageSize);
  }

  return (
    <div
      className={`${cs.gridPagination} flex items-center justify-between px-2`}
    >
      <div className="flex items-center ">
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
                variant={pageNum === currentPage ? "outline" : "ghost"}
                className={`h-8 w-8 p-0 ${
                  pageNum === "..." ? "pointer-events-none" : ""
                }`}
                onClick={(e) => {
                  setCurrentPage(e);
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
            disabled={currentPage >= gridModel.pager.endPage}
          >
            Next
          </SheButton>
        </div>
        <div>
          <Select
            value={`${pageSize}`}
            onValueChange={(pageSize) => {
              setPageSize(pageSize);
            }}
          >
            <SelectTrigger className={cs.selectTrigger}>
              <SelectValue placeholder={pageSize} />
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
