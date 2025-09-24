import { JSX, useEffect, useState } from "react";

import { X } from "lucide-react";
import cs from "./SheMultiSelectSearch.module.scss";
import { CommandInput } from "@/components/ui/command.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISheMultiSelectSearch } from "@/const/interfaces/primitive-components/ISheMultiSelectSearch.ts";

export default function SheMultiSelectSearch({
  searchRef,
  searchClassName: className = "",
  searchStyle: style,
  searchElementClassName: elementClassName = "",
  searchElementStyle: elementStyle,
  searchValue,
  searchPlaceholder = "search...",
  searchPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
  hideSearchClearBtn,
  showSearch,
  onSearch,
}: ISheMultiSelectSearch): JSX.Element {
  // ==================================================================== STATE MANAGEMENT
  const [_searchValue, setSearchValue] = useState<string>("");

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (searchValue !== _searchValue) {
      setSearchValue(searchValue);
    }
  }, [searchValue]);

  // ==================================================================== EVENT HANDLERS
  function onSearchChangeHandler(value: string) {
    setSearchValue(value);
    onSearch?.(value);
  }

  function onClearSearchHandler() {
    setSearchValue("");
    setTimeout(() => searchRef?.current?.focus());
    onSearch?.("");
  }

  // ==================================================================== LAYOUT
  if (!showSearch) {
    return null;
  }

  return (
    <div className={`${cs.sheMultiSelectSearch} ${className}`} style={style}>
      <CommandInput
        ref={searchRef}
        className={`${cs.sheMultiSelectSearchInput} ${elementClassName}`}
        style={elementStyle}
        value={_searchValue}
        placeholder={translate(
          searchPlaceholderTransKey,
          {},
          searchPlaceholder,
        )}
        onValueChange={onSearchChangeHandler}
      />
      {!hideSearchClearBtn && (
        <SheButton
          icon={X}
          size="small"
          variant="secondary"
          txtColor="#64748b"
          disabled={!_searchValue || _searchValue.length === 0}
          onClick={onClearSearchHandler}
        />
      )}
    </div>
  );
}
