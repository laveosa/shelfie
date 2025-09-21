import React, { useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import { PanelLeft, Trash2, X } from "lucide-react";

import cs from "./SheProductCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import { ISheProductCard } from "@/const/interfaces/complex-components/ISheProductCard.ts";

export default function SheProductCard({
  className = "",
  headerClassName = "",
  contextClassName = "",
  view = "card",
  loading,
  width,
  minWidth = "400px",
  maxWidth,
  isMinimized,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  showHeader = true,
  showToggleButton,
  showCloseButton,
  children,
  showNotificationCard = false,
  notificationCardProps,
  showPrimaryButton = false,
  primaryButtonTitle,
  primaryButtonTitleTransKey,
  primaryButtonDisabled,
  primaryButtonModel,
  showSecondaryButton = false,
  secondaryButtonTitle = "Cancel",
  secondaryButtonTitleTransKey,
  secondaryButtonModel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onIsMinimizedChange,
}: ISheProductCard) {
  const [_isMinimized, setIsMinimized] = useState(isMinimized);
  const cardContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!_.isNil(isMinimized) && isMinimized !== _isMinimized)
      setIsMinimized(isMinimized);
  }, [isMinimized]);

  // useEffect(() => {
  //   const element = cardContentRef.current;
  //   if (element) {
  //     const hasScrollbar = element.scrollHeight > element.clientHeight;
  //     if (hasScrollbar) {
  //       element.classList.add(cs.hasScrollbar);
  //       element.style.marginRight = "-5px";
  //       element.style.paddingRight = "5px";
  //     } else {
  //       element.classList.remove(cs.hasScrollbar);
  //       element.style.marginRight = "0px";
  //       element.style.paddingRight = "0px";
  //     }
  //   }
  // }, [children]);

  function onMinimizeCardHandler() {
    setIsMinimized((prev) => {
      onIsMinimizedChange?.(!prev);
      return !prev;
    });
  }

  return (
    <div
      className={`${className || ""} ${cs.sheProductCard || ""} ${view === "card" ? cs.card : ""} ${_isMinimized ? "sheCardMinimized" : ""}`}
      style={{
        width,
        minWidth,
        maxWidth,
        padding: view === "borderless" ? "10px 0 20px 0" : "",
      }}
    >
      {showHeader && (
        <div className={`${cs.cardHeader} ${headerClassName}`}>
          <div className={cs.titleBlock}>
            <div className={cs.cardTitleBlock}>
              {showToggleButton && (
                <SheButton
                  className={cs.toggleButton}
                  style={
                    showToggleButton
                      ? { display: "block" }
                      : { display: "none" }
                  }
                  icon={PanelLeft}
                  variant="ghost"
                  onClick={onMinimizeCardHandler}
                />
              )}
              <div
                className={`${cs.cardTitle} she-title`}
                style={{
                  ...(showToggleButton && { paddingLeft: "40px" }),
                  visibility: _isMinimized ? "hidden" : "visible",
                }}
              >
                <Trans i18nKey={titleTransKey}>{title}</Trans>
              </div>
            </div>
            {!_isMinimized && showCloseButton && (
              <SheButton
                className={cs.closeButton}
                icon={X}
                variant="ghost"
                onClick={onSecondaryButtonClick}
              />
            )}
          </div>
          {!_isMinimized && (
            <>
              <div className="she-text">
                <Trans i18nKey={textTransKey}>{text}</Trans>
              </div>
              <div className="she-subtext">
                <Trans i18nKey={descriptionTransKey}>{description}</Trans>
              </div>
            </>
          )}
        </div>
      )}
      {loading && <SheLoading />}
      <div
        ref={cardContentRef}
        className={`${cs.cardContent} ${contextClassName} ${loading ? cs.cardContentLoading : ""} ${
          showPrimaryButton || showSecondaryButton
            ? cs.cardContentWithFooter
            : ""
        }`}
      >
        {children}
      </div>
      {!_isMinimized &&
        (showSecondaryButton || showPrimaryButton || showNotificationCard) && (
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
                {...secondaryButtonModel}
                variant="secondary"
                onClick={onSecondaryButtonClick}
                disabled={loading}
              >
                <Trans i18nKey={secondaryButtonTitleTransKey}>
                  {secondaryButtonTitle}
                </Trans>
              </SheButton>
            )}
            {showPrimaryButton && (
              <SheButton
                {...primaryButtonModel}
                onClick={onPrimaryButtonClick}
                disabled={loading || primaryButtonDisabled}
              >
                <Trans i18nKey={primaryButtonTitleTransKey}>
                  {primaryButtonTitle}
                </Trans>
              </SheButton>
            )}
            {showNotificationCard && (
              <SheCardNotification
                className={cs.cardNotification}
                buttonColor="#EF4343"
                buttonVariant="outline"
                buttonText="Delete"
                buttonIcon={Trash2}
                {...notificationCardProps}
              />
            )}
          </div>
        )}
    </div>
  );
}
