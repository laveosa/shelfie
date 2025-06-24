import { JSX, useEffect, useState } from "react";
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
import { ISheListItem } from "@/const/interfaces/primitive-components/ISheListItem.ts";
import SheListHeader from "@/components/primitive/she-list/components/she-list-header/SheListHeader.tsx";
import SheListFooter from "@/components/primitive/she-list/components/she-list-footer/SheListFooter.tsx";
import SheListItem from "@/components/primitive/she-list/components/she-list-item/SheListItem.tsx";
import { addItemsId, generateId } from "@/utils/helpers/quick-helper.ts";
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
  emptySearchPlaceholder = "no data found...",
  emptySearchPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
  selectAllItemPlaceholder = "select all",
  selectAllItemPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
  selectNoneItemPlaceholder = "none",
  selectNoneItemPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
  noItemsPlaceholder = "no items to display...",
  noItemsPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
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
  onSecondaryBtnClick,
  onPrimaryBtnClick,
  ...props
}: ISheList<T>): JSX.Element {
  const [_items, setItems] = useState<ISheListItem<T>[]>(null);
  const [_selected, setSelected] = useState<T>(null);
  const [_selectedValues, setSelectedValues] = useState<T[]>([]);
  const [_isItemsWithIcons, setIsItemsWithIcons] = useState<boolean>(null);
  const [_isItemsWithColors, setIsItemsWithColors] = useState<boolean>(null);

  const ariaDescribedbyId = `${generateId()}_LIST_ID`;
  const headerProps = getCustomProps<ISheList<T>, ISheListHeader>(
    props,
    SheListHeaderDefaultModel,
  );
  const footerProps = getCustomProps<ISheList<T>, ISheListFooter>(
    props,
    SheListFooterDefaultModel,
  );

  useEffect(() => {
    if (_.isEqual(items, _items)) return;

    setIsItemsWithIcons(null);
    setIsItemsWithColors(null);

    setItems(() => {
      return addItemsId<ISheListItem<T>>(items).map((item) => {
        if (!_isItemsWithIcons && item.icon) setIsItemsWithIcons(true);
        if (!_isItemsWithColors && item.colors) setIsItemsWithColors(true);
        return item;
      });
    });
  }, [items]);

  useEffect(() => {
    if (mode === "single" && !_.isEqual(selected, _selected))
      setSelected(selected);
    if (mode === "multi" && !_.isEqual(selectedValues, _selectedValues))
      setSelectedValues(selectedValues);
  }, [selected, selectedValues]);

  // ==================================================================== EVENT

  function onClickHandler(data: T) {
    console.log(data);
  }

  function onSelectHandler(data: T) {
    /*const newSelectedValues = _selectedValues.includes(option)
      ? _selectedValues.filter((value) => value !== option)
      : [..._selectedValues, option];
    setSelectedValues(newSelectedValues);*/
  }

  function onClickNoneHandler() {}

  function onSelectAllHandler() {
    /*if (_selectedValues.length === _items.length) {
      onClearButtonHandler();
    } else {
      setSelectedValues(_items.map((option) => option.value));
    }*/
  }

  // ==================================================================== PRIVATE

  function onSecondaryBtnClickHandler(event) {
    console.log(event);
    if (onSecondaryBtnClick) onSecondaryBtnClick(event);
  }

  function onPrimaryBtnClickHandler(event) {
    console.log(event);
    if (onPrimaryBtnClick) onPrimaryBtnClick(event);
  }

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheList} ${className} ${fullWidth ? cs.fullWidth : ""} ${cs[view]}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <Command>
        <SheListHeader view={view} {...headerProps} />
        <CommandList>
          <CommandEmpty className={cs.noDataMessageBlock}>
            {(!_items || _items.length === 0) && (
              <span className="she-placeholder">
                <Trans i18nKey={noItemsPlaceholderTransKey}>
                  {noItemsPlaceholder}
                </Trans>
              </span>
            )}
            {_items && _items.length > 0 && (
              <span className="she-placeholder">
                <Trans i18nKey={emptySearchPlaceholderTransKey}>
                  {emptySearchPlaceholder}
                </Trans>
              </span>
            )}
          </CommandEmpty>
          {_items && _items.length > 0 && (
            <CommandGroup className={cs.sheListGroup}>
              {showSelectNone && mode === "single" && (
                <SheListItem
                  className={`${cs.sheListItemContainer} ${cs.sheListItemSpecial}`}
                  text={selectNoneItemPlaceholder}
                  textTransKey={selectNoneItemPlaceholderTransKey}
                  isLoading={isLoading}
                  ariaDescribedbyId={ariaDescribedbyId}
                  view={view}
                  onClick={onClickNoneHandler}
                />
              )}
              {showSelectAll && mode === "multi" && (
                <SheListItem
                  className={`${cs.sheListItemContainer} ${cs.sheListItemSpecial}`}
                  text={selectAllItemPlaceholder}
                  textTransKey={selectAllItemPlaceholderTransKey}
                  isSelected={_selectedValues?.length === items?.length}
                  isLoading={isLoading}
                  ariaDescribedbyId={ariaDescribedbyId}
                  view={view}
                  onClick={onSelectAllHandler}
                />
              )}
              {_items.map((item) => (
                <SheListItem
                  key={item.id}
                  className={cs.sheListItemContainer}
                  isItemsWithIcons={_isItemsWithIcons}
                  isItemsWithColors={_isItemsWithColors}
                  isLoading={isLoading}
                  ariaDescribedbyId={ariaDescribedbyId}
                  mode={mode}
                  view={view}
                  onClick={onClickHandler}
                  onSelect={onSelectHandler}
                  {...item}
                />
              ))}
            </CommandGroup>
          )}
        </CommandList>
        <SheListFooter
          view={view}
          onSecondaryBtnClick={onSecondaryBtnClickHandler}
          onPrimaryBtnClick={onPrimaryBtnClickHandler}
          {...footerProps}
        />
      </Command>
    </div>
  );
}
