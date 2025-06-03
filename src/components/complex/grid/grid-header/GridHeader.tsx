import { Filter, Search } from "lucide-react";
import { useState } from "react";

import cs from "./GridHeader.module.scss";
import { GridPagination } from "@/components/complex/grid/grid-pagination/GridPagination.tsx";
import { ColumnsViewOptions } from "@/components/complex/grid/grid-columns-view-options/ColumnsViewOptions.tsx";
import { IGridHeader } from "@/const/interfaces/complex-components/IGridHeader.ts";
import GridItemsSorting from "@/components/complex/grid/grid-items-sorting/GridItemsSorting.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { useGridContext } from "@/state/context/grid-context.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function GridHeader<TData>({ table }: IGridHeader<TData>) {
  const {
    showPagination,
    showSorting,
    showColumnsViewOptions,
    showSearch,
    children,
    onGridRequestChange,
  } = useGridContext();
  const [searchValue, setSearchValue] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event);
    onGridRequestChange({ searchQuery: event });
  };

  return (
    <div className={cs.gridHeaderWrapper}>
      <div className={cs.gridHeader}>
        <div className={cs.headerGroup}>
          {showSearch && (
            <SheInput
              className={cs.searchInput}
              value={searchValue}
              onDelay={handleInputChange}
              placeholder={"Search"}
              minWidth="130px"
              icon={Search}
              showClearBtn
            />
          )}
          {showColumnsViewOptions && <ColumnsViewOptions table={table} />}
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
      {filtersOpen && <div className={cs.filtersContainer}>{children}</div>}
    </div>
  );
}
