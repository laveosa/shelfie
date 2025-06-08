import { JSX, useEffect, useState } from "react";

import cs from "./SheMultiSelectSearch.module.scss";
import { ISheMultiSelectSearch } from "@/const/interfaces/primitive-components/ISheMultiSelectSearch.ts";
import { CommandInput } from "@/components/ui/command.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { X } from "lucide-react";

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
  const { translate } = useAppTranslation();
  const [_searchValue, setSearchValue] = useState<string>(null);

  useEffect(() => {
    if (searchValue !== _searchValue) {
      setSearchValue(searchValue);
    }
  }, [searchValue]);

  // ==================================================================== EVENT

  function onSearchChangeHandler(value) {
    setSearchValue(value);
    if (onSearch) onSearch(value);
  }

  function onClearSearchHandler() {
    setSearchValue(null);
    if (onSearch) onSearch(null);
  }

  // ==================================================================== PRIVATE

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
        placeholder={translate(searchPlaceholderTransKey, searchPlaceholder)}
        onValueChange={onSearchChangeHandler}
      />
      {!hideSearchClearBtn && (
        <SheButton
          icon={X}
          size="small"
          variant="ghost"
          onClick={onClearSearchHandler}
        />
      )}
    </div>
  );
}
