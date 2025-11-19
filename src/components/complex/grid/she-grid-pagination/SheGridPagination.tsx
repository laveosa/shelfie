import { ChevronLeft, ChevronRight } from "lucide-react";

import cs from "./SheGridPagination.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { useGridContext } from "@/state/context/grid-context.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

const pageSizeOptions: ISheSelectItem<number>[] = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "50",
    value: 50,
  },
];

export function SheGridPagination() {
  // ==================================================================== STATE
  const { gridRequestModel, onGridRequestChange } = useGridContext();
  const { currentPage, totalPages, pageSize, endPage } = gridRequestModel || {};

  // ==================================================================== EVENT HANDLER
  function onPreviousPageHandler() {
    // onGridRequestChange({ ...gridRequestModel, currentPage: currentPage - 1 });
  }

  function onNextPageHandler() {
    // onGridRequestChange({ ...gridRequestModel, currentPage: currentPage + 1 });
  }

  function onSetCurrentPageHandler(pageNum) {
    if (typeof pageNum !== "number") return null;

    // onGridRequestChange({ ...gridRequestModel, currentPage: pageNum });
  }

  function onSetPageSizeHandler(newPageSize) {
    /*onGridRequestChange({
      ...gridRequestModel,
      pageSize: parseInt(newPageSize),
      currentPage: 1,
    });*/
  }

  // ==================================================================== PRIVATE
  function _getPageNumbers(): any[] {
    const pages = [];

    if (currentPage > 2) {
      pages.push(1);
    }

    if (currentPage > 3) {
      pages.push("...");
    }

    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }

    pages.push(currentPage);

    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1 && currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.gridPagination}>
      <div className={cs.gridPaginationContainer}>
        <div className={cs.gridPaginationPageStepper}>
          <SheButton
            variant="ghost"
            icon={ChevronLeft}
            disabled={currentPage <= 1}
            onClick={onPreviousPageHandler}
          />
          <div className={cs.gridPaginationPageIndex}>
            {_getPageNumbers().map((pageNum: any, idx) => (
              <SheButton
                key={
                  typeof pageNum === "number"
                    ? `page-${pageNum}`
                    : `ellipsis-${idx}`
                }
                variant={pageNum === currentPage ? "outline" : "ghost"}
                disabled={pageNum === currentPage || pageNum === "..."}
                className={
                  pageNum === "..."
                    ? cs.gridPaginationPageIndexPlaceholder
                    : cs.gridPaginationPageIndexItem
                }
                onClick={() => onSetCurrentPageHandler(pageNum)}
              >
                <span className="she-text">{pageNum}</span>
              </SheButton>
            ))}
          </div>
          <SheButton
            variant="ghost"
            icon={ChevronRight}
            iconPosition={DirectionEnum.RIGHT}
            disabled={currentPage >= endPage}
            onClick={onNextPageHandler}
          />
        </div>
        <SheSelect<number>
          items={pageSizeOptions}
          selected={pageSize}
          placeholder=" "
          hideFirstOption
          minWidth="60px"
          maxWidth="60px"
          onSelect={onSetPageSizeHandler}
        />
      </div>
    </div>
  );
}
