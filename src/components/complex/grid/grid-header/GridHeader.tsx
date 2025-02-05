import { useState } from "react";

import cs from "./GridHeader.module.scss";
import { GridPagination } from "@/components/complex/grid/grid-pagination/GridPagination.tsx";
import { ColumnsViewOptions } from "@/components/complex/grid/grid-columns-view-options/ColumnsViewOptions.tsx";
import { IGridHeader } from "@/const/interfaces/complex-components/IGridHeader.ts";
import GridItemsSorting from "@/components/complex/grid/grid-items-sorting/GridItemsSorting.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Search } from "lucide-react";

export default function GridHeader<TData>({
  gridModel,
  onGridRequestChange,
  table,
  sortingItems,
  showPagination = true,
  showSorting = true,
  showColumnsViewOptions = true,
  showSearch = true,
  children,
}: IGridHeader<TData>) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event);
    onGridRequestChange({ searchQuery: event });
  };

  return (
    <div className={cs.gridHeader}>
      <div className={cs.headerGroup}>
        {showSearch && (
          <SheInput
            className={cs.searchInput}
            value={searchValue}
            onDelay={handleInputChange}
            placeholder={"Search"}
            icon={<Search />}
            showClearBtn
          />
        )}
        {showColumnsViewOptions && <ColumnsViewOptions table={table} />}
        {showSorting && (
          <GridItemsSorting
            items={sortingItems}
            onChange={onGridRequestChange}
          />
        )}
        {children}
      </div>
      <div className={cs.headerGroup}>
        {showPagination && (
          <GridPagination
            gridModel={gridModel}
            onChange={onGridRequestChange}
          />
        )}
      </div>
    </div>
  );
}
