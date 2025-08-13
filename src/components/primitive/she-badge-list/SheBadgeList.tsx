import React, { JSX, useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import cs from "./SheBadgeList.module.scss";
import SheBadge from "@/components/primitive/she-badge/SheBadge.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheBadgeList } from "@/const/interfaces/primitive-components/ISheBadgeList.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function SheBadgeList<T>(props: ISheBadgeList<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
    elementClassName = "",
    elementStyle,
    items,
    extraBudge,
    maxBadgeAmount,
    autoBadgeAmount,
    variant = "secondary",
    color,
    textColor,
    iconColor,
    elementIcon,
    placeholder = "no data to display...",
    placeholderTransKey = "PLACE_FOR_TRANS_KEY",
    elementMinWidth,
    elementMaxWidth,
    elementFullWidth,
    direction = "row",
    textWrap,
    itemsWrap = "wrap",
    disabled,
    isLoading,
    showCloseBtn,
    icon,
    onClick,
    onClose,
    onCloseAllExtra,
    onClear,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheBadgeList<T>,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<ISheBadge<T>[]>(null);
  const [_scrollInfo, setScrollInfo] = useState(null);
  const [_maxBadgeAmount, setMaxBadgeAmount] = useState<number>(null);

  // ==================================================================== REFS
  const badgeListContextRef = useRef<HTMLDivElement>(null);

  // ==================================================================== UTILITIES
  const {
    translate,
    ariaDescribedbyId,
    addItemsId,
    removeItemFromListByIdentifier,
  } = useComponentUtilities({
    identifier: "SheBadgeList",
  });
  const plusMoreBtnWidth = 100;

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setTimeout(() => {
      setScrollInfo(_hasVisibleScroll(badgeListContextRef.current));
    });
  }, []);

  useEffect(() => {
    if (!_.isEqual(items, _items)) {
      setItems(addItemsId(_calculateMaxBadgeAmount(items)));
      setTimeout(() =>
        setScrollInfo(_hasVisibleScroll(badgeListContextRef.current)),
      );
    }
  }, [items]);

  useEffect(() => {
    setMaxBadgeAmount(maxBadgeAmount);
    _calculateMaxBadgeAmount(items);
  }, [maxBadgeAmount, autoBadgeAmount]);

  // ==================================================================== EVENT HANDLERS
  function onClickHandler(
    item: ISheBadge<T>,
    model: IOutputEventModel<T | string, ISheBadge<T>, React.MouseEvent>,
  ) {
    onClick?.(item, { ...model });
  }

  function onCloseHandler(
    item: ISheBadge<T>,
    model: IOutputEventModel<T | string, ISheBadge<T>, React.MouseEvent>,
  ) {
    const tmpList: ISheBadge<T>[] = removeItemFromListByIdentifier(
      _items,
      "id",
      item.id,
    );
    setItems(tmpList);
    _calculateMaxBadgeAmount(tmpList);
    onClose?.(item, { ...model });
  }

  function onCloseAllExtraHandler(
    value: ISheBadge<T>[],
    model: IOutputEventModel<T | string, ISheBadge<T>, React.MouseEvent>,
  ) {
    setItems(_items.slice(0, _maxBadgeAmount));
    setMaxBadgeAmount(null);
    onCloseAllExtra?.(value, { ...model, model: props } as any);
  }

  function onClearHandler(event) {
    setItems(null);
    setMaxBadgeAmount(null);
    onClear?.(null, { event, value: null, model: { ...props, items: null } });
  }

  function onScrollHandler(event: React.WheelEvent<HTMLDivElement>) {
    if (event.deltaY === 0 || !badgeListContextRef?.current) return;

    const elem = badgeListContextRef.current;

    if (_scrollInfo?.hasHorizontalScroll) {
      elem.scrollBy({
        left: event.deltaY * 0.8,
      });
    }
  }

  // ==================================================================== PRIVATE
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

  function _calculateMaxBadgeAmount(items: ISheBadge<T>[]): ISheBadge<T>[] {
    if (
      (!_.isNil(maxBadgeAmount) && maxBadgeAmount >= 0) ||
      !autoBadgeAmount ||
      !items ||
      items.length === 0 ||
      !badgeListContextRef ||
      !badgeListContextRef.current
    )
      return items;

    const elem = badgeListContextRef.current;
    const gapW = 4;
    const paddingW = 16;
    const iconW = 16;
    const closeIconW = 16;
    const averageCharWidth = 7.2;

    let calculateWidth = plusMoreBtnWidth;
    let tmpMaxAmount = 0;

    for (let i = 0; i < items.length; i++) {
      const textLength = items[i].text?.toString().length ?? 0;
      let badgeW =
        Math.ceil(textLength * averageCharWidth) + paddingW + closeIconW + gapW;

      if (items[i].icon) {
        badgeW += iconW + gapW;
      }

      calculateWidth += badgeW;

      if (i < items.length - 1) {
        calculateWidth += gapW;
      }

      if (calculateWidth < elem.clientWidth) {
        tmpMaxAmount++;
      } else if (calculateWidth > elem.clientWidth && tmpMaxAmount === 0) {
        tmpMaxAmount++;
        items[i].textWrap = "dots";
        items[i].maxWidth = items[i + 1] ? "52%" : "100%";
      }
    }

    setMaxBadgeAmount(tmpMaxAmount);
    return items;
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${shePrimitiveComponentWrapperProps.className} ${cs.sheBadgeList} ${cs[itemsWrap]} ${icon ? cs.withIcon : ""}`}
      skeletonClassName={`${shePrimitiveComponentWrapperProps.skeletonClassName} ${cs.sheBadgeListSkeleton}`}
      clearBtnClassName={`${shePrimitiveComponentWrapperProps.clearBtnClassName} ${cs.sheBadgeListClearButton}`}
      iconProps={{ className: cs.autocompleteIcon }}
      ariaDescribedbyId={ariaDescribedbyId}
      clearBtnValue={items}
      clearBtnPosition="out"
      iconPosition="in"
      onClear={onClearHandler}
    >
      <div
        ref={badgeListContextRef}
        className={cs.sheBadgeListContext}
        style={{
          paddingBottom: _scrollInfo?.hasHorizontalScroll ? "4px" : "0",
        }}
        role="list"
        tabIndex={0}
        onWheel={onScrollHandler}
      >
        {_items?.length > 0 ? (
          <div
            className={`${cs.sheBadgeListItemsContainer} ${cs.fadeInAnimation}`}
            style={{ flexDirection: direction as any }}
          >
            {_items.slice(0, _maxBadgeAmount || _items.length).map((item) => (
              <div
                key={item.id}
                className={`${cs.sheBadgeListItem} badge-list-item-cover`}
                style={{
                  width:
                    item.fullWidth || elementFullWidth ? "100%" : "fit-content",
                  minWidth: item.minWidth || elementMinWidth,
                  maxWidth: item.maxWidth || elementMaxWidth,
                }}
              >
                <SheBadge<T>
                  {...item}
                  className={item.className || elementClassName}
                  style={item.style || elementStyle}
                  textWrap={item.textWrap || textWrap}
                  color={item.color || color}
                  textColor={item.textColor || textColor}
                  iconColor={item.iconColor || iconColor}
                  icon={item.icon || elementIcon}
                  minWidth="100%"
                  fullWidth={item.fullWidth || elementFullWidth}
                  variant={(item.variant || variant) as any}
                  disabled={!_.isNil(item.disabled) ? item.disabled : disabled}
                  isLoading={
                    !_.isNil(item.isLoading) ? item.isLoading : isLoading
                  }
                  showCloseBtn={
                    !_.isNil(item.showCloseBtn)
                      ? item.showCloseBtn
                      : showCloseBtn
                  }
                  onClick={(_, model) => onClickHandler(item, model)}
                  onClose={(_, model) => onCloseHandler(item, model)}
                />
              </div>
            ))}

            {_maxBadgeAmount && _items?.length > _maxBadgeAmount && (
              <div className={cs.sheBadgeListItem}>
                <SheBadge<T>
                  {...extraBudge}
                  className={extraBudge?.className || elementClassName}
                  elementClassName={cs.plusMoreBtn}
                  style={extraBudge?.style || elementStyle}
                  text={`+ ${_items.length - _maxBadgeAmount} ${translate("PLACE_VALID_TRANS_KEY", "more")}`}
                  textWrap={extraBudge?.textWrap || textWrap}
                  color={extraBudge?.color || color}
                  textColor={extraBudge?.textColor || textColor}
                  iconColor={extraBudge?.iconColor || iconColor}
                  maxWidth={plusMoreBtnWidth + "px"}
                  fullWidth={extraBudge?.fullWidth || elementFullWidth}
                  variant={(extraBudge?.variant || variant) as any}
                  value={_items.slice(_maxBadgeAmount, _items.length) as any}
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
                  onClick={(value: any, model) => onClickHandler(value, model)}
                  onClose={(value: any, model) =>
                    onCloseAllExtraHandler(value, model)
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className={cs.noDataBlock}>
            <span className="she-placeholder">
              <Trans i18nKey={placeholderTransKey}>{placeholder}</Trans>
            </span>
          </div>
        )}
      </div>
    </ShePrimitiveComponentWrapper>
  );
}
