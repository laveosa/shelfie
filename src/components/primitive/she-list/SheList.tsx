import { JSX, useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import cs from "./SheList.module.scss";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command.tsx";
import { ISheList } from "@/const/interfaces/primitive-components/ISheList.ts";
import SheListHeader from "@/components/primitive/she-list/components/she-list-header/SheListHeader.tsx";
import SheListFooter from "@/components/primitive/she-list/components/she-list-footer/SheListFooter.tsx";
import SheMultiSelectItem from "@/components/primitive/she-multi-select/components/she-multi-select-item/SheMultiSelectItem.tsx";
import { ISheListItem } from "@/const/interfaces/primitive-components/ISheListItem.ts";
import { addItemsId } from "@/utils/helpers/quick-helper.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import {
  ISheListHeader,
  SheListHeaderDefaultModel,
} from "@/const/interfaces/primitive-components/ISheListHeader.ts";
import {
  ISheListFooter,
  SheListFooterDefaultModel,
} from "@/const/interfaces/primitive-components/ISheListFooter.ts";

export default function SheList<T>({
  id,
  className = "",
  style,
  items,
  selected,
  selectedValues,
  emptySearchPlaceholder,
  emptySearchPlaceholderTransKey,
  selectAllItemPlaceholder,
  selectAllItemPlaceholderTransKey,
  selectNoneItemPlaceholder,
  selectNoneItemPlaceholderTransKey,
  noItemsPlaceholder,
  noItemsPlaceholderTransKey,
  mode = "single",
  view = "normal",
  showSelectAll,
  showSelectNone,
  minWidth,
  maxWidth,
  fullWidth,
  disabled,
  isLoading,
  isDnd,
  ...props
}: ISheList<T>): JSX.Element {
  const [_items, setItems] = useState<ISheListItem[]>(null);
  const [_selected, setSelected] = useState<T>(null);
  const [_selectedValues, setSelectedValues] = useState<T[]>([]);
  const [_isItemsWithIcons, setIsItemsWithIcons] = useState<boolean>(null);
  const [_isItemsWithColors, setIsItemsWithColors] = useState<boolean>(null);

  const headerProps = getCustomProps<ISheList<T>, ISheListHeader>(
    props,
    SheListHeaderDefaultModel,
  );
  const footerProps = getCustomProps<ISheList<T>, ISheListFooter>(
    props,
    SheListFooterDefaultModel,
  );

  console.log("header: ", headerProps);
  console.log("footer: ", footerProps);

  useEffect(() => {
    setIsItemsWithIcons(null);
    setIsItemsWithColors(null);

    if (!_.isEqual(items, _items)) setItems(addItemsId<ISheListItem>(items));
  }, [items]);

  useEffect(() => {
    if (mode === "single" && !_.isEqual(selected, _selected))
      setSelected(selected);
    if (mode === "multi" && !_.isEqual(selectedValues, _selectedValues))
      setSelectedValues(selectedValues);
  }, [selected, selectedValues]);

  // ==================================================================== EVENT

  function onSelectHandler(option: string) {
    const newSelectedValues = _selectedValues.includes(option)
      ? _selectedValues.filter((value) => value !== option)
      : [..._selectedValues, option];
    setSelectedValues(newSelectedValues);
  }

  function onSelectAllHandler() {
    /*if (_selectedValues.length === _items.length) {
      onClearButtonHandler();
    } else {
      setSelectedValues(_items.map((option) => option.value));
    }*/
  }

  // ==================================================================== PRIVATE

  function onSecondaryBtnClickHandler() {}

  function onPrimaryBtnClickHandler() {}

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheList} ${className}  ${fullWidth ? cs.fullWidth : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <Command>
        <SheListHeader {...headerProps} />
        <CommandList>
          <CommandEmpty className={cs.noDataMessageBlock}>
            <span className="she-placeholder">
              <Trans i18nKey={emptySearchPlaceholderTransKey}>
                {emptySearchPlaceholder}
              </Trans>
            </span>
          </CommandEmpty>
          <CommandGroup className={cs.sheListGroup}>
            {showSelectAll && (
              <SheMultiSelectItem
                key="all"
                className={`${cs.sheListItemContainer} ${cs.sheListItemSelectAllContainer}`}
                text={selectAllItemPlaceholder}
                textTransKey={selectAllItemPlaceholderTransKey}
                isSelected={_selectedValues?.length === items?.length}
                isLoading={isLoading}
                onClick={onSelectAllHandler}
              />
            )}
            {items?.map((item: ISheListItem) => (
              <SheMultiSelectItem
                key={item.id}
                className={cs.sheListItemContainer}
                isSelected={_selectedValues?.includes(item.value)}
                isItemsWithIcons={_isItemsWithIcons}
                isItemsWithColors={_isItemsWithColors}
                isLoading={isLoading}
                onClick={onSelectHandler}
                {...item}
              />
            ))}
          </CommandGroup>
        </CommandList>
        <SheListFooter
          onSecondaryBtnClick={onSecondaryBtnClickHandler}
          onPrimaryBtnClick={onPrimaryBtnClickHandler}
          {...footerProps}
        />
      </Command>
    </div>
  );
}
