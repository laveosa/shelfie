import { Filter, Search } from "lucide-react";
import { useState } from "react";

import cs from "./SheGridHeader.module.scss";
import { GridPagination } from "@/components/complex/grid/grid-pagination/GridPagination.tsx";
import { ColumnsViewOptions } from "@/components/complex/grid/filters/grid-columns-view-options/ColumnsViewOptions.tsx";
import GridItemsSorting from "@/components/complex/grid/filters/grid-items-sorting/GridItemsSorting.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useGridContext } from "@/state/context/grid-context.ts";
import { ISheGridHeader } from "@/const/interfaces/complex-components/ISheGridHeader.ts";
import { RowData } from "@tanstack/react-table";

export default function SheGridHeader({
  gridHeaderClassName = "",
  gridHeaderStyle,
  table,
  isLoading,
  showHeader,
}: ISheGridHeader) {
  const {
    showPagination,
    showSorting,
    showColumnsViewOptions,
    showSearch,
    children,
    onGridRequestChange,
  } = useGridContext();
  // ==================================================================== STATE
  const [searchValue, setSearchValue] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // ==================================================================== EVENT HANDLERS
  const onInputChangeHandler = (event) => {
    setSearchValue(event);
    onGridRequestChange({ searchQuery: event });
  };

  // ==================================================================== LAYOUT
  if (!showHeader) {
    return null;
  }

  return (
    <div
      className={`${cs.gridHeaderWrapper} ${gridHeaderClassName} ${isLoading ? "disabled" : ""}`}
      style={{ ...gridHeaderStyle }}
    >
      <div className={cs.gridHeader}>
        <div className={cs.headerGroup}>
          {showSearch && (
            <SheInput
              value={searchValue}
              onDelay={onInputChangeHandler}
              placeholder={"Search"}
              minWidth="130px"
              icon={Search}
              showClearBtn
            />
          )}
          {showSorting && <GridItemsSorting />}
          <SheButton
            className={cs.filterButton}
            icon={Filter}
            variant="ghost"
            value={filtersOpen ? "Hide Filter" : "Filter"}
            minWidth="126px"
            onClick={() => setFiltersOpen(!filtersOpen)}
          />
        </div>
        <div className={cs.headerGroup}>
          {showPagination && <GridPagination />}
        </div>
      </div>
      {filtersOpen && (
        <div className={cs.filtersContainer}>
          <div className={cs.customFilters}>{children}</div>
          {showColumnsViewOptions && (
            <ColumnsViewOptions<RowData> table={table} />
          )}
        </div>
      )}
      {showColumnsViewOptions && (
        <div
          style={{
            display: filtersOpen ? "block" : "none",
            position: "absolute",
            visibility: "hidden",
          }}
        >
          <ColumnsViewOptions<RowData> table={table} />
        </div>
      )}
    </div>
  );
}
