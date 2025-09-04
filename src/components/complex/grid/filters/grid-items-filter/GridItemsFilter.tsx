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
import { useGridContext } from "@/state/context/grid-context.ts";

interface GridFilterProps<T> {
  items: T[];
  columnName: string;
  selected?: number[];
  getId: (item: T) => number;
  getName: (item: T) => string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
}

export default function GridItemsFilter<T>({
  items,
  columnName,
  selected,
  getId,
  getName,
  icon,
}: GridFilterProps<T>) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { onGridRequestChange, gridRequestModel } = useGridContext();
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
    onGridRequestChange({
      ...gridRequestModel,
      currentPage: 1,
      filter: {
        ...gridRequestModel?.filter,
        [columnName]: [],
      },
    });
    setDropdownOpen(false);
  }

  function onApplyHandle() {
    if (selectedIds.length > 0) {
      onGridRequestChange({
        ...gridRequestModel,
        filter: {
          ...gridRequestModel?.filter,
          [columnName]: selectedIds,
        },
      });
    }
    setDropdownOpen(false);
  }

  return (
    <div className={cs.gridItemsFilterWrapper}>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={(open) => {
          if (!open && selectedIds.length > 0) onApplyHandle();
          if (!open && selectedIds.length === 0) onResetHandle();
          setDropdownOpen(open);
        }}
      >
        <div className={cs.triggerContainer}>
          <DropdownMenuTrigger asChild>
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
                <span
                  className={
                    selectedIds?.length > 0
                      ? cs.columnNameWithIds
                      : cs.columnName
                  }
                >
                  {columnName}
                </span>
                <ChevronDown
                  className={
                    selectedIds.length === 0
                      ? cs.chevronIcon
                      : `${cs.chevronIcon} ${cs.chevronIconWithSelectedIds}`
                  }
                />
              </div>
            </SheButton>
          </DropdownMenuTrigger>
          {selectedIds.length > 0 && (
            <div
              className={cs.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                onResetHandle();
              }}
            >
              <SheIcon icon={X} />
            </div>
          )}
        </div>
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
            <SheButton
              onClick={onResetHandle}
              variant="outline"
              value="Default"
            />
            <SheButton onClick={onApplyHandle} value="Apply" />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
