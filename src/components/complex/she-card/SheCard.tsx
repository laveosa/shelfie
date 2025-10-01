import React, { useEffect, useState } from "react";
import _ from "lodash";

import cs from "./SheCard.module.scss";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheCardHeader from "@/components/complex/she-card/components/she-card-header/SheCardHeader.tsx";
import SheCardFooter from "@/components/complex/she-card/components/she-card-footer/SheCardFooter.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import {
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import { ISheCard } from "@/const/interfaces/complex-components/ISheCard.ts";
import {
  ISheCardHeader,
  SheCardHeaderDefaultModel,
} from "@/const/interfaces/complex-components/ISheCardHeader.ts";
import {
  ISheCardFooter,
  SheCardFooterDefaultModel,
} from "@/const/interfaces/complex-components/ISheCardFooter.ts";

export default function SheCard(props: ISheCard) {
  // ==================================================================== PROPS
  const {
    children,
    className = "",
    contextClassName = "",
    view = ComponentViewEnum.CARD,
    showHeader,
    showFooter,
    isMinimized,
    width,
    minWidth,
    maxWidth,
    isLoading,
    onSecondaryButtonClick,
    onIsMinimizedChange,
    onNotificationCardButtonClick,
  } = props;
  const sheCardHeaderProps = getCustomProps<ISheCard, ISheCardHeader>(
    props,
    SheCardHeaderDefaultModel,
  );
  const sheCardFooterProps = getCustomProps<ISheCard, ISheCardFooter>(
    props,
    SheCardFooterDefaultModel,
  );
  const restProps = removeCustomProps<ISheCard>(props, [
    SheCardHeaderDefaultModel,
    SheCardFooterDefaultModel,
  ]);

  // ==================================================================== UTILITIES
  const [_isMinimized, setIsMinimized] = useState<boolean>(null);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (!_.isNil(isMinimized) && isMinimized !== _isMinimized)
      setIsMinimized(isMinimized);
  }, [isMinimized]);

  useEffect(() => {
    onIsMinimizedChange?.(_isMinimized);
  }, [_isMinimized]);

  // ==================================================================== EVENT HANDLERS

  function onMinimizeCardHandler() {
    setIsMinimized((prev) => !prev);
  }

  function onNotificationCardButtonClickHandler() {
    onNotificationCardButtonClick?.(props);
  }

  // ==================================================================== LAYOUT
  return (
    <div
      className={`${className} ${cs.sheCard} ${cs[view]} ${_isMinimized && "sheCardMinimized"} ${showHeader && cs.withHeader}
      ${showFooter && cs.withFooter}`}
      style={{
        width,
        minWidth,
        maxWidth,
      }}
    >
      <SheLoading className={cs.sheCardLoading} isLoading={isLoading} />
      <SheCardHeader
        {...sheCardHeaderProps}
        view={view}
        isMinimized={_isMinimized}
        onHeaderToggleClick={onMinimizeCardHandler}
        onHeaderCloseClick={onSecondaryButtonClick}
      />
      <div
        {...restProps}
        className={`${cs.cardContextWrapper} ${isLoading ? cs.cardContextIsLoading : ""}`}
      >
        <div className={`${cs.cardContextContainer} ${contextClassName}`}>
          {children}
        </div>
      </div>
      <SheCardFooter
        {...sheCardFooterProps}
        view={view}
        isMinimized={_isMinimized}
        onNotificationCardButtonClick={onNotificationCardButtonClickHandler}
      />
    </div>
  );
}
