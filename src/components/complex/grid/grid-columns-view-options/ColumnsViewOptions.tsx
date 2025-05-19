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
import { useGridContext } from "@/state/context/grid-context.ts";

interface IColumnsViewOptions<TData> {
  table: Table<TData>;
}

export function ColumnsViewOptions<TData>({
  table,
}: IColumnsViewOptions<TData>) {
  const {
    columnsPreferences,
    preferenceContext,
    onApplyColumns,
    onDefaultColumns,
  } = useGridContext();

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [previousSelectedColumns, setPreviousSelectedColumns] = useState<
    string[]
  >([]);

  useEffect(() => {
    initializeColumns(
      columnsPreferences?.viewsReferences[preferenceContext]?.columns,
    );
  }, [columnsPreferences]);

  function initializeColumns(columns: any) {
    if (!columns) return;
    const newSelectedColumns: string[] = [];
    table.getAllColumns().forEach((column) => {
      const isVisible = columns[column.id];
      if (isVisible === true) {
        column.toggleVisibility(true);
        newSelectedColumns.push(column.id);
      } else if (isVisible === false) {
        column.toggleVisibility(false);
      } else {
        column.toggleVisibility(true);
        newSelectedColumns.push(column.id);
      }
    });
    setSelectedColumns(newSelectedColumns);
  }

  function onCheckedHandler(value: boolean, column: any) {
    setSelectedColumns((prev) =>
      value ? [...prev, column.id] : prev.filter((id) => id !== column.id),
    );
  }

  function onApplyHandler() {
    table.getAllColumns().forEach((column) => {
      const shouldShow = selectedColumns.includes(column.id);
      column.toggleVisibility(shouldShow);
    });

    const model = {
      viewsReferences: {
        [preferenceContext]: {
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
    onApplyColumns(model);
    setDropdownOpen(false);
  }

  function onResetHandler() {
    onDefaultColumns();
    setDropdownOpen(false);
  }

  function onOpenChangeHandler(open: boolean) {
    if (!open) {
      setSelectedColumns(previousSelectedColumns);
    } else {
      setPreviousSelectedColumns(selectedColumns);
    }
    setDropdownOpen(open);
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={onOpenChangeHandler}>
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
              onCheckedChange={(value) => onCheckedHandler(value, column)}
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <div className={cs.buttonBlock}>
          <SheButton onClick={onResetHandler} variant="outline">
            Default
          </SheButton>
          <SheButton onClick={onApplyHandler}>Apply</SheButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
