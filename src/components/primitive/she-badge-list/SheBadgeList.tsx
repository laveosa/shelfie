import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

import cs from "./SheBadgeList.module.scss";
import { ISheBadgeList } from "@/const/interfaces/primitive-components/ISheBadgeList.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheBadge from "@/components/primitive/she-badge/SheBadge.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheBadgeList({
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  label,
  labelTransKey,
  tooltip,
  items,
  maxBadgeAmount,
  color,
  textColor,
  iconColor,
  icon,
  placeholder = "no data to display...",
  placeholderTransKey = "PLACE_FOR_TRANS_KEY",
  showClearBtn,
  minWidth,
  maxWidth,
  fullWidth,
  elementMinWidth,
  elementMaxWidth,
  elementFullWidth,
  direction = "row",
  textWrap,
  disabled,
  isLoading,
  required,
  hideCloseBtn,
  componentView,
  onClick,
  onClose,
  onClear,
  ...props
}: ISheBadgeList): JSX.Element {
  const { translate } = useAppTranslation();
  const [_items, setItems] = useState<ISheBadge[]>(null);

  const uniqueComponentId = `${generateId(4)}_BADGE_LIST_ID`;

  useEffect(() => {
    if (items?.length > 0 && !_.isEqual(items, _items))
      setItems(_addItemsIds(items));
  }, [items]);

  // ==================================================================== EVENT

  function onClickHandler(item: ISheBadge) {
    if (onClick) onClick(item);
  }

  function onCloseHandler(item: ISheBadge) {
    const tmpList: ISheBadge[] = _removeItemFromList(_items, item);
    setItems(tmpList);
    if (onClose) onClose(item);
  }

  function onClearHandler() {
    setItems(null);
    if (onClear) onClear(null);
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheBadge[]) {
    return items?.map((item, idx) => {
      return {
        ...item,
        id: `${uniqueComponentId.toString()}_${(idx + 1).toString()}`,
      };
    });
  }

  function _removeItemFromList(
    list: ISheBadge[],
    item: ISheBadge,
  ): ISheBadge[] {
    if (list?.length === 0 || !item) return;
    return list.filter((elem) => elem.id !== item.id);
  }

  // ==================================================================== LAYOUT

  return (
    <div
      className={`${cs.sheBadgeList} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${componentView ? cs[componentView] : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
      {...props}
    >
      <div className={cs.sheBadgeListComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={uniqueComponentId}
        />
        <div className={cs.sheBadgeListControl}>
          <SheIcon
            icon={icon}
            className={cs.iconBlock}
            aria-describedby={uniqueComponentId}
          />
          <div className={cs.sheBadgeListContext}>
            {_items?.length > 0 ? (
              <div
                className={cs.sheBadgeListItemsContainer}
                style={{ flexDirection: direction }}
              >
                {_items.map((item) => (
                  <div
                    key={item.id}
                    className={cs.sheBadgeListListItem}
                    style={{
                      width:
                        item.fullWidth || elementFullWidth ? "100%" : "auto",
                    }}
                  >
                    <SheBadge
                      className={item.className || elementClassName}
                      style={item.style || elementStyle}
                      textWrap={item.textWrap || textWrap}
                      color={item.color || color}
                      textColor={item.textColor || textColor}
                      iconColor={item.iconColor || iconColor}
                      minWidth={item.minWidth || elementMinWidth}
                      maxWidth={item.maxWidth || elementMaxWidth}
                      fullWidth={item.fullWidth || elementFullWidth}
                      disabled={
                        !_.isNil(item.disabled) ? item.disabled : disabled
                      }
                      isLoading={
                        !_.isNil(item.isLoading) ? item.isLoading : isLoading
                      }
                      showCloseBtn={
                        !_.isNil(item.showCloseBtn)
                          ? item.showCloseBtn
                          : hideCloseBtn
                      }
                      onClick={() => onClickHandler(item)}
                      onClose={() => onCloseHandler(item)}
                      {...item}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={cs.noDataMessage}>
                <span className="she-placeholder">
                  {translate(placeholderTransKey, placeholder)}
                </span>
              </div>
            )}
          </div>
          <SheClearButton
            value={_items?.length > 0}
            showClearBtn={showClearBtn}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={uniqueComponentId}
            onClear={onClearHandler}
          />
        </div>
      </div>
    </div>
  );
}
