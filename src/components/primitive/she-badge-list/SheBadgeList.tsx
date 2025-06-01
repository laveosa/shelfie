import React, { JSX, useEffect, useRef, useState } from "react";
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
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export default function SheBadgeList({
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  label,
  labelTransKey,
  tooltip,
  items,
  extraBudge,
  maxBadgeAmount,
  autoBadgeAmount,
  variant = "secondary",
  color,
  textColor,
  iconColor,
  icon,
  elementIcon,
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
  itemsWrap = "wrap",
  disabled,
  isLoading,
  required,
  showCloseBtn,
  componentView = ComponentViewEnum.STANDARD,
  onClick,
  onClose,
  onCloseAllExtra,
  onClear,
  ...props
}: ISheBadgeList): JSX.Element {
  const { translate } = useAppTranslation();
  const [_items, setItems] = useState<ISheBadge[]>(null);
  const [_scrollInfo, setScrollInfo] = useState(null);

  const refBadgeListContext = useRef(null);
  const uniqueComponentId = `${generateId(4)}_BADGE_LIST_ID`;

  useEffect(() => {
    setTimeout(() => {
      setScrollInfo(_hasVisibleScroll(refBadgeListContext.current));
    });
  }, []);

  useEffect(() => {
    if (!_.isEqual(items, _items)) setItems(_addItemsIds(items));
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
  function onCloseAllExtraHandler() {
    const tmpList: ISheBadge[] = _items.slice(maxBadgeAmount, _items.length);
    setItems(_items.slice(0, maxBadgeAmount));

    if (onCloseAllExtra) onCloseAllExtra(tmpList);
  }

  function onClearHandler() {
    setItems(null);

    if (onClear) onClear(null);
  }

  function onScrollHandler(event: React.WheelEvent<HTMLDivElement>) {
    if (event.deltaY === 0 || !refBadgeListContext?.current) return;

    const elem = refBadgeListContext.current;

    if (_scrollInfo?.hasHorizontalScroll) {
      elem.scrollBy({
        left: event.deltaY * 0.8,
      });
    }
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
    if (list?.length === 0 || !item) return list;
    return list.filter((elem) => elem.id !== item.id);
  }

  function _hasVisibleScroll(element) {
    if (!element) {
      return { hasVerticalScroll: false, hasHorizontalScroll: false };
    }

    const hasVerticalScroll = element.scrollHeight > element.clientHeight;
    const hasHorizontalScroll = element.scrollWidth > element.clientWidth;

    return {
      hasVerticalScroll,
      hasHorizontalScroll,
      hasAnyScroll: hasVerticalScroll || hasHorizontalScroll,
    };
  }

  // ==================================================================== LAYOUT

  return (
    <div
      className={`${cs.sheBadgeList} ${className} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${cs[componentView]} ${cs[itemsWrap]}`}
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
          <div
            ref={refBadgeListContext}
            className={cs.sheBadgeListContext}
            style={{
              paddingBottom: _scrollInfo?.hasHorizontalScroll ? "4px" : "0",
            }}
            onWheel={onScrollHandler}
          >
            {_items?.length > 0 ? (
              <div
                className={cs.sheBadgeListItemsContainer}
                style={{ flexDirection: direction }}
              >
                {_items.slice(0, maxBadgeAmount).map((item) => (
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
                      icon={item.icon || elementIcon}
                      minWidth={item.minWidth || elementMinWidth}
                      maxWidth={item.maxWidth || elementMaxWidth}
                      fullWidth={item.fullWidth || elementFullWidth}
                      variant={item.variant || variant}
                      disabled={
                        !_.isNil(item.disabled) ? item.disabled : disabled
                      }
                      isLoading={
                        !_.isNil(item.isLoading) ? item.isLoading : isLoading
                      }
                      showCloseBtn={
                        !_.isNil(item.showCloseBtn)
                          ? item.showCloseBtn
                          : showCloseBtn
                      }
                      onClick={() => onClickHandler(item)}
                      onClose={() => onCloseHandler(item)}
                      {...item}
                    />
                  </div>
                ))}

                {_items?.length > maxBadgeAmount && (
                  <div className={cs.sheBadgeListListItem}>
                    <SheBadge
                      className={extraBudge?.className || elementClassName}
                      style={extraBudge?.style || elementStyle}
                      text={
                        extraBudge?.text ||
                        `+ ${_items.length - maxBadgeAmount} more`
                      }
                      textTransKey={
                        extraBudge?.textTransKey || "PLACE_VALID_TRANS_KET"
                      }
                      textWrap={extraBudge?.textWrap || textWrap}
                      color={extraBudge?.color || color}
                      textColor={extraBudge?.textColor || textColor}
                      iconColor={extraBudge?.iconColor || iconColor}
                      minWidth={extraBudge?.minWidth || elementMinWidth}
                      maxWidth={extraBudge?.maxWidth || elementMaxWidth}
                      fullWidth={extraBudge?.fullWidth || elementFullWidth}
                      variant={extraBudge?.variant || variant}
                      disabled={
                        !_.isNil(extraBudge?.disabled)
                          ? extraBudge?.disabled
                          : disabled
                      }
                      isLoading={
                        !_.isNil(extraBudge?.isLoading)
                          ? extraBudge?.isLoading
                          : isLoading
                      }
                      showCloseBtn={
                        !_.isNil(extraBudge?.showCloseBtn)
                          ? extraBudge?.showCloseBtn
                          : showCloseBtn
                      }
                      onClick={() => onClickHandler(extraBudge)}
                      onClose={() => onCloseAllExtraHandler()}
                      {...extraBudge}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span className="she-placeholder">
                  {translate(placeholderTransKey, placeholder)}
                </span>
              </div>
            )}
          </div>
          <SheClearButton
            value={_items && _items.length > 0}
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
