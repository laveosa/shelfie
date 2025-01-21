import cs from "./SheProductCard.module.scss";
import { ISheProductCard } from "@/const/interfaces/complex-components/ISheProductCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { CircleX, Loader, PanelLeft } from "lucide-react";
import * as React from "react";
import { Trans } from "react-i18next";

export default function SheProductCard({
  className = "",
  loading = true,
  styles,
  minWidth,
  maxWidth,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  showToggleButton = true,
  showCloseButton = true,
  fullWidth,
  children,
  ...props
}: ISheProductCard) {
  function onDecreaseCardHandler() {}

  function onCloseCardHandler() {}

  return (
    <div
      className={`${className || ""} ${cs.sheProductCard || ""} ${fullWidth ? cs.fullWidth : ""}`}
      style={{
        minWidth,
        maxWidth,
      }}
    >
      <div className={cs.cardHeader}>
        <div className={cs.titleBlock}>
          {showToggleButton && (
            <SheButton
              icon={PanelLeft}
              variant="ghost"
              onClick={onDecreaseCardHandler}
            />
          )}
          <div className="she-title">
            <Trans i18nKey={titleTransKey}>{title}</Trans>
          </div>
          {showCloseButton && (
            <SheButton
              icon={CircleX}
              variant="ghost"
              onClick={onCloseCardHandler}
            />
          )}
        </div>
        <div className="she-text">
          <Trans i18nKey={textTransKey}>{text}</Trans>
        </div>
        <div className="she-subtext">
          <Trans i18nKey={descriptionTransKey}>{description}</Trans>
        </div>
      </div>
      {loading && (
        <div className={cs.loaderContainer}>
          <Loader
            className="animate-spin"
            style={{
              width: "30px",
              height: "30px",
              color: "darkgray",
            }}
          />
        </div>
      )}
      <div className={cs.cardContent}>{children}</div>
    </div>
  );
}
