import { ChevronDown, Settings2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./GridItemsFilter.module.scss";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

interface GridFilterProps<T> {
  items: T[];
  columnName: string;
  selected?: number[];
  getId: (item: T) => number;
  getName: (item: T) => string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  onSelectionChange: (selectedIds: number[]) => void;
}

export default function GridItemsFilter<T>({
  items,
  columnName,
  selected,
  getId,
  getName,
  icon,
  onSelectionChange,
}: GridFilterProps<T>) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!dropdownOpen && selected?.length > 0) {
      setSelectedIds(selected);
    }
  }, [selected, dropdownOpen]);

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
    <div className={cs.gridItemsFilterWrapper}>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={(open) => {
          if (!open && selectedIds.length > 0) {
            onApplyHandle();
          }
          if (!open && selectedIds.length === 0) {
            onResetHandle();
          }
          setDropdownOpen(open);
        }}
      >
        <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
          <SheButton
            className={cs.dropdownMenuTriggerButton}
            variant="outline"
            disabled={!items || items.length === 0}
            onClick={() => setDropdownOpen(true)}
          >
            <div className={cs.buttonInnerItems}>
              {selectedIds?.length > 0 ? (
                <span>{selectedIds.length}</span>
              ) : icon ? (
                <SheIcon icon={icon} className={cs.settingsIcon} />
              ) : (
                <Settings2 className={cs.settingsIcon} />
              )}
              {columnName}
              <ChevronDown className={cs.chevronIcon} />
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
      <SheButton
        className={cs.clearButton}
        icon={X}
        variant="secondary"
        onClick={() => onResetHandle()}
        minWidth="20px"
        maxWidth="20px"
        maxHeight="20px"
        minHeight="20px"
        disabled={!selectedIds.length}
      />
    </div>
  );
}
