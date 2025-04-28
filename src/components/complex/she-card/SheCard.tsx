import { Trans } from "react-i18next";
import { X } from "lucide-react";

import { ISheCard } from "@/const/interfaces/complex-components/ISheCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./SheCard.module.scss";

export default function SheCard({
  className = "",
  view = "card",
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
  children,
  showHeader = false,
  showFooter = false,
  showCloseButton,
  showPrimaryButton = false,
  primaryButtonTitle,
  primaryButtonTitleTransKey,
  primaryButtonDisabled,
  showSecondaryButton = false,
  secondaryButtonTitle,
  secondaryButtonTitleTransKey,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: ISheCard) {
  return (
    <div
      className={`${className || ""} ${cs.sheCard || ""} ${view === "card" ? cs.card : ""}`}
      style={{
        width,
        minWidth,
        maxWidth,
      }}
    >
      {showHeader && (
        <div className={cs.cardHeader}>
          <div className={cs.titleBlock}>
            <div className={cs.cardTitleBlock}>
              <div className={`${cs.cardTitle} she-title`}>
                <Trans i18nKey={titleTransKey}>{title}</Trans>
              </div>
            </div>
            {showCloseButton && (
              <SheButton
                className={cs.closeButton}
                icon={X}
                variant="ghost"
                onClick={onSecondaryButtonClick}
                disabled={loading}
              />
            )}
          </div>
          <>
            {text && (
              <div className="she-text">
                <Trans i18nKey={textTransKey}>{text}</Trans>
              </div>
            )}
            {description && (
              <div className="she-subtext">
                <Trans i18nKey={descriptionTransKey}>{description}</Trans>
              </div>
            )}
          </>
        </div>
      )}
      {loading && <div className={cs.loaderContainer}></div>}
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
                  disabled={loading}
                >
                  <Trans i18nKey={secondaryButtonTitleTransKey}>
                    {secondaryButtonTitle}
                  </Trans>
                </SheButton>
              )}
              {showPrimaryButton && (
                <SheButton
                  onClick={onPrimaryButtonClick}
                  disabled={loading || primaryButtonDisabled}
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
