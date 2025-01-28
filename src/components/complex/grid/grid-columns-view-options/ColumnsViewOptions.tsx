import { useEffect, useState } from "react";
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
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";

interface IColumnsViewOptions<TData> {
  table: Table<TData>;
}

export function ColumnsViewOptions<TData>({
  table,
}: IColumnsViewOptions<TData>) {
  const service = useProductsPageService();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [previousSelectedColumns, setPreviousSelectedColumns] = useState<
    string[]
  >([]);

  useEffect(() => {
    const preferences = storageService.getLocalStorage(
      StorageKeyEnum.PREFERENCES,
    );
    initializeColumns(preferences);
  }, [table]);

  const initializeColumns = (preferences: any) => {
    if (!preferences) return;
    table.getAllColumns().forEach((column) => {
      const isVisibleInPreferences =
        preferences.viewsReferences.productReferences.columns[column.id];
      column.toggleVisibility(!isVisibleInPreferences);
      if (!isVisibleInPreferences) {
        setSelectedColumns((prev) => [...prev, column.id]);
      }
    });
  };

  const handleCheckedChange = (value: boolean, column: any) => {
    setSelectedColumns((prev) =>
      value ? [...prev, column.id] : prev.filter((id) => id !== column.id),
    );
  };

  const applyChanges = () => {
    table.getAllColumns().forEach((column) => {
      const shouldShow = selectedColumns.includes(column.id);
      column.toggleVisibility(shouldShow);
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
                !selectedColumns.includes(column.id),
              ]),
          ),
        },
      },
    };
    service.updateUserPreferencesHandler(model);
    setDropdownOpen(false);
  };

  const resetToDefault = () => {
    service.resetUserPreferencesHandler();
    const preferences = storageService.getLocalStorage(
      StorageKeyEnum.PREFERENCES,
    );
    initializeColumns(preferences);
    setDropdownOpen(false);
  };

  const handleDropdownOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedColumns(previousSelectedColumns);
    } else {
      setPreviousSelectedColumns(selectedColumns);
    }
    setDropdownOpen(open);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={handleDropdownOpenChange}>
      <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
        <SheButton
          variant="outline"
          icon={Settings2}
          onClick={() => setDropdownOpen(true)}
        >
          <div className={cs.buttonInnerItems}>
            Columns
            <ChevronDown />
          </div>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cs.dropdownMenuContent}>
        <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={selectedColumns.includes(column.id)}
              onCheckedChange={(value) => handleCheckedChange(value, column)}
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <div className={cs.buttonBlock}>
          <SheButton onClick={resetToDefault} variant="outline">
            Default
          </SheButton>
          <SheButton onClick={applyChanges}>Apply</SheButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
