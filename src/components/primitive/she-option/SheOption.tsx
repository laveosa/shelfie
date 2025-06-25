import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheOption.module.scss";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { Image } from "lucide-react";

export default function SheOption<T>({
  className = "",
  style,
  disabled,
  isLoading,
  ariaDescribedbyId,
  mode = "single",
  view = "normal",
  value,
  icon,
  iconProps,
  colors,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  sideText,
  sideTextTransKey,
  sideDescription,
  sideDescriptionTransKey,
  isSelected,
  showIconsColumn,
  showColorsColumn,
  tooltip,
  toggleProps,
  onCheck,
  onClick,
  ...props
}: ISheOption<T>): JSX.Element {
  // ==================================================================== EVENT

  function onClickHandler(event: React.MouseEvent) {
    if (onClick) onClick(value, event);
  }

  function onCheckHandler(event: React.MouseEvent) {
    if (onCheck) onCheck(value, event);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <div
      className={`${cs.sheOption} ${className} ${cs[mode]} ${cs[view]} ${isSelected ? cs.optionSelected : ""}`}
      onClick={onClickHandler}
      {...props}
    >
      {mode === "multiple" && (
        <div className={cs.sheOptionToggleContainer}>
          <SheToggle
            checked={isSelected}
            onChecked={onCheckHandler}
            {...toggleProps}
          />
        </div>
      )}
      {showIconsColumn && (
        <div className={cs.sheOptionIconContainer}>
          <SheIcon
            icon={icon ? icon : Image}
            className={`${cs.iconBlock} ${!icon ? cs.iconPlaceholder : ""}`}
            aria-describedby={ariaDescribedbyId}
            {...iconProps}
          />
        </div>
      )}
      {showColorsColumn && (
        <div className={cs.sheOptionColorsContainer}>
          {colors?.map((color: string, idx: number) => (
            <div key={color + idx + 1} style={{ backgroundColor: color }}></div>
          ))}
        </div>
      )}
      <div className={cs.sheOptionInfoContainer}>
        <div className={cs.sheOptionInfoBlock}>
          {text && (
            <span className="she-text">
              <Trans i18nKey={textTransKey}>{text}</Trans>
            </span>
          )}
          {description && (
            <span className={`${cs.sheOptionDescription} she-subtext`}>
              <Trans i18nKey={descriptionTransKey}>{description}</Trans>
            </span>
          )}
        </div>
        {(sideText?.length > 0 || sideDescription?.length > 0) && (
          <div className={`${cs.sheOptionExtraInfoBlock}`}>
            {sideText?.length > 0 && (
              <span className="she-text">
                <Trans i18nKey={sideTextTransKey}>{sideText}</Trans>
              </span>
            )}
            {sideDescription?.length > 0 && (
              <span className={`${cs.sheOptionDescription} she-subtext`}>
                <Trans i18nKey={sideDescriptionTransKey}>
                  {sideDescription}
                </Trans>
              </span>
            )}
          </div>
        )}
      </div>
      {tooltip && (
        <div className={`${cs.sheOptionTooltipContainer}`}>
          <SheTooltip
            showDefaultIcon
            ariaDescribedbyId={ariaDescribedbyId}
            {...tooltip}
          />
        </div>
      )}
    </div>
  );
}
