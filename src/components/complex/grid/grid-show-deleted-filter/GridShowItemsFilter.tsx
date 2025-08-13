import { ChevronDown, Trash } from "lucide-react";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./GridShowDeletedFilter.module.scss";
import { useGridContext } from "@/state/context/grid-context.ts";

export default function GridShowItemsFilter({ context }: { context?: string }) {
  const gridShowItemsFilterItems = [
    { value: "false", text: `Hide ${context}` },
    { value: "true", text: `Show ${context}` },
  ];
  const { onGridRequestChange } = useGridContext();
  const [selectedValue, setSelectedValue] = useState<string>(
    gridShowItemsFilterItems[0].value,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onGridRequestChange({
      filter: {
        [`show${context}`]: value,
      },
    });
    setDropdownOpen(false);
  }

  const selectedOption = gridShowItemsFilterItems.find(
    (item) => item.value === selectedValue,
  );

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
        <SheButton
          variant="outline"
          icon={Trash}
          value={selectedOption.text}
          onClick={() => setDropdownOpen(true)}
        >
          <ChevronDown />
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cs.dropdownMenuContent}>
        {gridShowItemsFilterItems?.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.value}
            className="capitalize"
            checked={selectedValue === item.value}
            onCheckedChange={() => handleSelect(item.value)}
            onSelect={(event) => {
              event.preventDefault();
            }}
          >
            {item.text}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
