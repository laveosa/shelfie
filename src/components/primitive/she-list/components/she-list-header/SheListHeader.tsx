import { JSX, useEffect, useState } from "react";

import cs from "./SheListHeader.module.scss";
import { ISheListHeader } from "@/const/interfaces/primitive-components/ISheListHeader.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { CommandInput } from "@/components/ui/command.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { X } from "lucide-react";

export default function SheListHeader({
  searchRef,
  clearBtnIcon = X,
  headerClassName: className = "",
  headerStyle: style,
  searchClassName: elementClassName = "",
  searchStyle: elementStyle,
  searchValue,
  searchPlaceholder = "search...",
  searchPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
  hideSearchClearBtn,
  showHeader,
  onSearch,
}: ISheListHeader): JSX.Element {
  const { translate } = useAppTranslation();
  const [_searchValue, setSearchValue] = useState<string>("");

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
    setSearchValue("");
    setTimeout(() => searchRef?.current?.focus());
    if (onSearch) onSearch("");
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  if (!showHeader) {
    return null;
  }

  return (
    <div className={`${cs.sheListHeader} ${className}`} style={style}>
      <CommandInput
        ref={searchRef}
        className={`${cs.sheListHeaderInput} ${elementClassName}`}
        style={elementStyle}
        value={_searchValue}
        placeholder={translate(searchPlaceholderTransKey, searchPlaceholder)}
        onValueChange={onSearchChangeHandler}
      />
      {!hideSearchClearBtn && (
        <SheButton
          icon={clearBtnIcon}
          size="small"
          variant="ghost"
          onClick={onClearSearchHandler}
        />
      )}
    </div>
  );
}
