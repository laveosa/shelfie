import { ChevronDown, Settings2 } from "lucide-react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./ColumnsViewOptions.module.scss";
import { useEffect, useState } from "react";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";

const preferences = storageService.getLocalStorage(StorageKeyEnum.PREFERENCES);
console.log(preferences);

interface IColumnsViewOptions<TData> {
  table: Table<TData>;
}

export function ColumnsViewOptions<TData>({
  table,
}: IColumnsViewOptions<TData>) {
  const service = useProductsPageService();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]); // State for selected columns

  useEffect(() => {
    table.getAllColumns().forEach((column) => {
      const isVisibleInPreferences =
        preferences.viewsReferences.productReferences.columns[column.id];
      column.toggleVisibility(isVisibleInPreferences); // Set initial visibility
      if (!isVisibleInPreferences) {
        setSelectedColumns((prev) => [...prev, column.id]); // Mark hidden columns as selected
      }
    });
  }, [table]);

  function handleCheckedChange(value: boolean, column: any) {
    if (value) {
      setSelectedColumns((prev) => [...prev, column.id]); // Add column to selected
    } else {
      setSelectedColumns((prev) => prev.filter((id) => id !== column.id)); // Remove column from selected
    }
    // Do not toggle visibility here
  }

  function applyChanges() {
    table.getAllColumns().forEach((column) => {
      const isVisibleInPreferences =
        preferences.viewsReferences.productReferences.columns[column.id];
      console.log("Visible", isVisibleInPreferences);
      const shouldHide = selectedColumns.includes(column.id)
        ? !isVisibleInPreferences
        : isVisibleInPreferences;
      column.toggleVisibility(shouldHide); // Hide or show based on preferences and selection
    });

    const model = {
      globalPreferences: {},
      viewsReferences: {
        productReferences: {
          columns: Object.fromEntries(
            table
              .getAllColumns()
              .map((column) => [
                column.id,
                selectedColumns.includes(column.id),
              ]),
          ),
        },
      },
    };
    service.updateUserPreferencesHandler(model);
  }

  function resetToDefault() {
    // table.getAllColumns().forEach((column) => {
    //   column.toggleVisibility(true);
    // });
    // setSelectedColumns([]);
    service.resetUserPreferencesHandler();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cs.columnsViewOptions} asChild>
        <SheButton variant="outline" icon={Settings2}>
          <div className={cs.buttonInnerItems}>
            Columns
            <ChevronDown />
          </div>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[150px]">
        <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={selectedColumns.includes(column.id)} // Check based on selectedColumns
                onCheckedChange={(value) => handleCheckedChange(value, column)}
                onSelect={(event) => {
                  event.preventDefault();
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
        <DropdownMenuSeparator />
        <div className="flex justify-between">
          <SheButton onClick={resetToDefault}>Default</SheButton>{" "}
          <SheButton onClick={applyChanges}>Apply</SheButton>{" "}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
