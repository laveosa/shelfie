import React, { useEffect, useState } from "react";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
  ChevronDown,
} from "lucide-react";

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
  const { sortingItems, onGridRequestChange, gridRequestModel } =
    useGridContext();

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (
      gridRequestModel &&
      gridRequestModel.sortOption &&
      gridRequestModel.sortOption.length > 0
    )
      setSelectedValue(gridRequestModel.sortOption);
  }, [gridRequestModel]);

  function handleSelect(value: string) {
    setSelectedValue(value);

    /*onGridRequestChange({
      ...gridRequestModel,
      currentPage: 1,
      sortOption: value,
    });*/
    setDropdownOpen(false);
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger
        className={`${cs.dropdownMenuTrigger} ${dropdownOpen ? cs.dropdownMenuOpen : ""}`}
        asChild
      >
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
          <ChevronDown className={cs.chevronIcon} />
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
