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

export default function GridShowDeletedFilter() {
  const gridShowDeletedFilterItems = [
    { value: "false", text: "Hide deleted" },
    { value: "true", text: "Show deleted" },
  ];
  const { onGridRequestChange } = useGridContext();
  const [selectedValue, setSelectedValue] = useState<string>(
    gridShowDeletedFilterItems[0].value,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onGridRequestChange({ filter: { showDeleted: value } });
    setDropdownOpen(false);
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
        <SheButton
          variant="outline"
          icon={Trash}
          minWidth="120px"
          value={"Show Deleted"}
          onClick={() => setDropdownOpen(true)}
        >
          <ChevronDown />
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cs.dropdownMenuContent}>
        {gridShowDeletedFilterItems?.map((item) => (
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
