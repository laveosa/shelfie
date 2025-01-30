import { ArrowUpAZ, ChevronDown } from "lucide-react";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./GridItemsSorting.module.scss";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

interface GridItemsSortingProps {
  items: GridSortingModel[];
  onSelectionChange: (selectedValue: string) => void;
}

export default function GridItemsSorting({
  items,
  onSelectionChange,
}: GridItemsSortingProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onSelectionChange(value);
    setDropdownOpen(false);
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
        <SheButton
          variant="outline"
          icon={ArrowUpAZ}
          onClick={() => setDropdownOpen(true)}
        >
          <div className={cs.buttonInnerItems}>
            Sort
            <ChevronDown />
          </div>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cs.dropdownMenuContent}>
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.value}
            className="capitalize"
            checked={selectedValue === item.value}
            onCheckedChange={() => handleSelect(item.value)}
            onSelect={(event) => {
              event.preventDefault();
            }}
          >
            {item.description}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
