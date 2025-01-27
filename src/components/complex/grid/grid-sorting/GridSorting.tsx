import { Table } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpAZ,
  ArrowUpIcon,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "@/components/complex/grid/grid-columns-view-options/ColumnsViewOptions.module.scss";

interface IProductsGridSorting<TData> {
  table: Table<TData>;
}

export function GridSorting<TData>({ table }: IProductsGridSorting<TData>) {
  const sortableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanSort());

  const activeSorts = sortableColumns
    .filter((column) => column.getIsSorted())
    .map((column) => ({
      id: column.id,
      direction: column.getIsSorted(),
    }));

  const getSortLabel = () => {
    if (activeSorts.length === 0) return "Sort";

    if (activeSorts.length === 1) {
      const sort = activeSorts[0];
      return <span className="capitalize">{sort.id}</span>;
    }

    return `${activeSorts.length} sorts`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
        <SheButton variant="outline" icon={ArrowUpAZ}>
          <div className={cs.buttonInnerItems}>
            {getSortLabel()}
            <ChevronDown />
          </div>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {sortableColumns.map((column) => {
          const isSorted = column.getIsSorted();
          return (
            <DropdownMenuItem
              key={column.id}
              onClick={() => {
                column.toggleSorting(isSorted === "asc");
              }}
              className="flex items-center justify-between"
            >
              <span className="capitalize">{column.id}</span>
              {isSorted && (
                <span>
                  {isSorted === "asc" ? (
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                  )}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
