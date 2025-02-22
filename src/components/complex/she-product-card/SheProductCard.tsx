import { PanelLeft, X } from "lucide-react";
import { Trans } from "react-i18next";
import { useState } from "react";

import cs from "./SheProductCard.module.scss";
import { ISheProductCard } from "@/const/interfaces/complex-components/ISheProductCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function SheProductCard({
  className = "",
  view = "",
  loading,
  width,
  minWidth,
  maxWidth,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  showToggleButton,
  showCloseButton,
  children,
  showPrimaryButton,
  primaryButtonTitle,
  primaryButtonTitleTransKey,
  showSecondaryButton,
  secondaryButtonTitle,
  secondaryButtonTitleTransKey,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: ISheProductCard) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  function onMinimizeCardHandler() {
    setIsMinimized((prev) => !prev);
  }

  function onCloseCardHandler() {
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div
      className={`${className || ""} ${cs.sheProductCard || ""} ${view === "card" ? cs.card : ""}`}
      style={{
        width,
        minWidth,
        maxWidth: isMinimized ? "50px" : maxWidth,
      }}
    >
      <div className={cs.cardHeader}>
        <div className={cs.titleBlock}>
          {showToggleButton && (
            <SheButton
              className={isMinimized ? cs.titleBlock : cs.toggleButton}
              icon={PanelLeft}
              variant="ghost"
              onClick={onMinimizeCardHandler}
              disabled={loading}
            />
          )}
          {!isMinimized && (
            <div className={`${cs.cardTitle} she-title`}>
              <Trans i18nKey={titleTransKey}>{title}</Trans>
            </div>
          )}
          {!isMinimized && showCloseButton && (
            <SheButton
              className={cs.closeButton}
              icon={X}
              variant="ghost"
              onClick={onCloseCardHandler}
              disabled={loading}
            />
          )}
        </div>
        {!isMinimized && (
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
      {loading && <div className={cs.loaderContainer}></div>}
      <div
        className={cs.cardContent}
        style={isMinimized ? { paddingLeft: 0 } : {}}
      >
        {children}
      </div>
      {!isMinimized && (showSecondaryButton || showPrimaryButton) && (
        <div className={cs.cardFooter}>
          {showSecondaryButton && (
            <SheButton
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
            <SheButton onClick={onPrimaryButtonClick} disabled={loading}>
              <Trans i18nKey={primaryButtonTitleTransKey}>
                {primaryButtonTitle}
              </Trans>
            </SheButton>
          )}
        </div>
      )}
    </div>
  );
}
