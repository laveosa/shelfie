import { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import cs from "./SheCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheCard } from "@/const/interfaces/complex-components/ISheCard.ts";
import SheCardHeader from "@/components/complex/she-card/components/she-card-header/SheCardHeader.tsx";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import {
  ISheCardHeader,
  SheCardHeaderDefaultModel,
} from "@/const/interfaces/complex-components/ISheCardHeader.ts";

export default function SheCard(props: ISheCard) {
  // ==================================================================== PROPS
  const {
    children,
    className = "",
    headerClassName = "",
    footerClassName = "",
    contextClassName = "",
    view = ComponentViewEnum.CARD,
    title,
    titleTransKey,
    text,
    textTransKey,
    description,
    descriptionTransKey,
    showToggleButton,
    isMinimized,
    saveIsMinimizedCondition,
    isMinimizedConditionStorageKey,
    showNotificationCard,
    notificationCardProps,
    width,
    minWidth,
    maxWidth,
    fullWidth,
    isLoading,
    disabled,
    showHeader,
    showFooter,
    showCloseButton,
    showPrimaryButton,
    primaryButtonTitle,
    primaryButtonTitleTransKey,
    primaryButtonDisabled,
    primaryButtonProps,
    showSecondaryButton,
    secondaryButtonTitle,
    secondaryButtonTitleTransKey,
    secondaryButtonDisabled,
    secondaryButtonProps,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    onIsMinimizedChange,
  } = props;
  const sheCardHeaderProps = getCustomProps<ISheCard, ISheCardHeader>(
    props,
    SheCardHeaderDefaultModel,
  );

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

  // ==================================================================== LAYOUT
  return (
    <div
      className={`${className} ${cs.sheCard} ${cs[view]} ${_isMinimized ? "sheCardMinimized" : ""}`}
      style={{
        width,
        minWidth,
        maxWidth,
      }}
    >
      <SheCardHeader
        {...sheCardHeaderProps}
        view={view}
        isMinimized={_isMinimized}
        onHeaderToggleClick={onMinimizeCardHandler}
        onHeaderCloseClick={onSecondaryButtonClick}
      />
      {isLoading && <div className={cs.loaderContainer}></div>}
      <div
        className={cs.cardContent}
        style={{ height: !showFooter ? "100%" : "calc(100% - 80px)" }}
      >
        {children}
      </div>
      {showFooter && (
        <div>
          {(showSecondaryButton || showPrimaryButton) && (
            <div
              className={cs.cardFooter}
              style={{
                justifyContent: showSecondaryButton
                  ? "space-between"
                  : "flex-end",
              }}
            >
              {showSecondaryButton && (
                <SheButton
                  variant="secondary"
                  onClick={onSecondaryButtonClick}
                  disabled={isLoading}
                >
                  <Trans i18nKey={secondaryButtonTitleTransKey}>
                    {secondaryButtonTitle}
                  </Trans>
                </SheButton>
              )}
              {showPrimaryButton && (
                <SheButton
                  onClick={onPrimaryButtonClick}
                  disabled={isLoading || primaryButtonDisabled}
                >
                  <Trans i18nKey={primaryButtonTitleTransKey}>
                    {primaryButtonTitle}
                  </Trans>
                </SheButton>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
