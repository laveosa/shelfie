import { ChevronDown, Palette, Ruler, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./GridTraitsFilter.module.scss";
import { useGridContext } from "@/state/context/grid-context.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

type TraitType = "color" | "size";

interface IGridTraitsFilter {
  traitOptions: any[];
  traitType?: TraitType;
}

export default function GridTraitsFilter({
  traitOptions,
  traitType,
}: IGridTraitsFilter) {
  const { onGridRequestChange, gridRequestModel } = useGridContext();
  const [selectedValue, setSelectedValue] = useState<number>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!dropdownOpen && gridRequestModel?.filter?.traitOptions?.length > 0) {
      const matching = traitOptions.find((item) =>
        gridRequestModel.filter.traitOptions.includes(item.optionId),
      );
      if (matching) {
        setSelectedValue(matching.optionId);
      }
    }
  }, [gridRequestModel?.filter?.traitOptions, traitOptions, dropdownOpen]);

  function handleSelect(value: number) {
    setSelectedValue(value);
    const currentTraitOptionIds = traitOptions.map((opt) => opt.optionId);
    const prevTraitOptions = gridRequestModel?.filter?.traitOptions || [];
    const newTraitOptions = [
      ...prevTraitOptions.filter((id) => !currentTraitOptionIds.includes(id)),
      value,
    ];

    /*onGridRequestChange({
      ...gridRequestModel,
      filter: {
        ...gridRequestModel?.filter,
        traitOptions: newTraitOptions,
      },
    });*/

    setDropdownOpen(false);
  }

  function handleClearFilter() {
    if (!gridRequestModel) return;

    const updatedTraitOptions =
      gridRequestModel.filter?.traitOptions?.filter(
        (id) => id !== selectedValue,
      ) || [];

    /*onGridRequestChange({
      ...gridRequestModel,
      filter: {
        ...gridRequestModel.filter,
        traitOptions: updatedTraitOptions,
      },
    });*/
    setSelectedValue(null);
  }

  return (
    <div className={cs.gridTraitsFilterWrapper}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <div
          className={`${cs.triggerContainer} ${dropdownOpen ? cs.dropdownMenuOpen : ""}`}
        >
          <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
            <SheButton
              variant="outline"
              icon={traitType === "color" ? Palette : Ruler}
              minWidth="120px"
              value={traitType === "color" ? "Color" : "Size"}
              onClick={() => setDropdownOpen(true)}
            >
              <ChevronDown
                className={`${cs.chevronIcon} ${selectedValue ? cs.chevronIconRight : cs.chevronIconLeft}`}
              />
            </SheButton>
          </DropdownMenuTrigger>
          {selectedValue && (
            <div
              className={cs.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                handleClearFilter();
              }}
            >
              <SheIcon icon={X} />
            </div>
          )}
        </div>
        <DropdownMenuContent align="start" className={cs.dropdownMenuContent}>
          {traitOptions?.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.optionId}
              className="capitalize"
              checked={selectedValue === item.optionId}
              onCheckedChange={() => handleSelect(item.optionId)}
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              {
                <div key={item.optionId} className={cs.dropdownMenuItem}>
                  {traitType === "color" && (
                    <div
                      className={cs.dropdownMenuItemColor}
                      style={{
                        backgroundColor: item.optionColor,
                      }}
                    />
                  )}
                  <span>{item.optionName}</span>
                </div>
              }
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
