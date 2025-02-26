import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ChevronDown, Settings2 } from "lucide-react";
import cs from "./GridItemsFilter.module.scss";

interface GridFilterProps<T> {
  items: T[];
  columnName: string;
  onSelectionChange: (selectedIds: number[]) => void;
  getId: (item: T) => number;
  getName: (item: T) => string;
}

export default function GridItemsFilter<T>({
  items,
  columnName,
  onSelectionChange,
  getId,
  getName,
}: GridFilterProps<T>) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleSelect(id: number) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function onResetHandle() {
    setSelectedIds([]);
    onSelectionChange([]);
    setDropdownOpen(false);
  }

  function onApplyHandle() {
    if (selectedIds.length > 0) {
      onSelectionChange(selectedIds);
    }
    setDropdownOpen(false);
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
        <SheButton
          variant="outline"
          icon={Settings2}
          onClick={() => setDropdownOpen(true)}
        >
          <div className={cs.buttonInnerItems}>
            {columnName}
            <ChevronDown />
          </div>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cs.dropdownMenuContent}>
        <div className={cs.itemsList}>
          <DropdownMenuLabel>{columnName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className={cs.itemsContainer}>
            {items.map((item, index) => (
              <DropdownMenuCheckboxItem
                key={`${getId(item)}-${index}`}
                className="capitalize"
                checked={selectedIds.includes(getId(item))}
                onCheckedChange={() => handleSelect(getId(item))}
                onSelect={(event) => {
                  event.preventDefault();
                }}
              >
                {getName(item)}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
          <DropdownMenuSeparator />
        </div>
        <div className={cs.buttonBlock}>
          <SheButton onClick={onResetHandle} variant="outline">
            Default
          </SheButton>
          <SheButton onClick={onApplyHandle}>Apply</SheButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
