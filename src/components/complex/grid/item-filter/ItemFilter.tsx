// components/GridFilter.tsx
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx"; // Assuming you have a Button component
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ChevronDown, Settings2 } from "lucide-react";
import cs from "@/components/complex/grid/grid-columns-view-options/ColumnsViewOptions.module.scss"; // Assuming you have a Checkbox component

interface GridFilterProps<T> {
  items: T[];
  columnName: string;
  onSelectionChange: (selectedIds: number[]) => void;
  getId: (item: T) => number;
  getName: (item: T) => string;
}

export default function GridFilter<T>({
  items,
  columnName,
  onSelectionChange,
  getId,
  getName,
}: GridFilterProps<T>) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleApply = () => {
    if (selectedIds.length > 0) {
      onSelectionChange(selectedIds);
    }
    setDropdownOpen(false);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
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
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuLabel>{columnName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={getId(item)}
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
        <DropdownMenuSeparator />
        <Button onClick={handleApply}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
