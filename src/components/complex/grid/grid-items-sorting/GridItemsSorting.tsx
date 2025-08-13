import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
  ChevronDown,
} from "lucide-react";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./GridItemsSorting.module.scss";
import { useGridContext } from "@/state/context/grid-context.ts";

export default function GridItemsSorting() {
  const { sortingItems, onGridRequestChange } = useGridContext();

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onGridRequestChange({ sortOption: value });
    setDropdownOpen(false);
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
        <SheButton
          variant="outline"
          icon={
            selectedValue
              ? selectedValue === "Latest"
                ? ArrowDownNarrowWide
                : ArrowUpNarrowWide
              : ArrowDownUp
          }
          disabled={sortingItems?.length === 0}
          minWidth="120px"
          value={selectedValue ? selectedValue : "Sort"}
          onClick={() => setDropdownOpen(true)}
        >
          <ChevronDown />
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cs.dropdownMenuContent}>
        {sortingItems?.map((item) => (
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
