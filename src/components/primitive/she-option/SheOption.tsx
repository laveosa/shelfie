import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import cs from "./SheOption.module.scss";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { Image } from "lucide-react";

export default function SheOption<T>({
  className = "",
  style,
  toggleClassName = "",
  toggleStyle,
  iconClassName = "",
  iconStyle,
  colorsClassName = "",
  colorsStyle,
  infoClassName = "",
  infoStyle,
  tooltipClassName = "",
  tooltipStyle,
  minWidth,
  maxWidth,
  fullWidth,
  disabled,
  isLoading,
  ariaDescribedbyId,
  mode = "single",
  view = "normal",
  value,
  showIconsColumn,
  icon,
  iconProps,
  showColorsColumn,
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
  tooltip,
  toggleProps,
  checkOnClick,
  onCheck,
  onClick,
  ...props
}: ISheOption<T>): JSX.Element {
  const [_isSelected, setIsSelected] = useState<boolean>(null);

  useEffect(() => {
    if (!_.isEqual(isSelected, _isSelected)) setIsSelected(isSelected);
  }, [isSelected]);

  // ==================================================================== EVENT

  function onClickHandler(event: React.MouseEvent) {
    if (checkOnClick) {
      setIsSelected((prevState) => {
        const tmpIsSelected = !prevState;
        if (onClick) onClick(value, event);
        if (onCheck) onCheck(tmpIsSelected, event);
        return tmpIsSelected;
      });
    } else {
      if (onClick) onClick(value, event);
    }
  }

  function onCheckHandler(value: boolean, event: React.MouseEvent) {
    event.stopPropagation();
    setIsSelected(value);
    if (onCheck) onCheck(value, event);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <SheSkeleton isLoading={isLoading}>
      <div
        className={`${cs.sheOption} ${className} ${fullWidth ? cs.fullWidth : ""} ${cs[mode]} ${cs[view]} ${mode !== "plain" && isSelected ? cs.optionSelected : ""} ${mode !== "plain" ? cs.hoverEffect : ""} ${disabled || isLoading ? "disabled" : ""}`}
        style={{
          minWidth,
          maxWidth,
          ...style,
        }}
        onClick={onClickHandler}
        {...props}
      >
        {mode === "multiple" && (
          <SheToggle
            className={`${cs.sheOptionToggleContainer} ${toggleClassName}`}
            style={toggleStyle}
            checked={_isSelected}
            onChecked={onCheckHandler}
            {...toggleProps}
          />
        )}
        {(icon || showIconsColumn) && (
          <SheIcon
            className={`${cs.sheOptionIconContainer} ${iconClassName} ${!icon ? cs.iconPlaceholder : ""}`}
            style={iconStyle}
            icon={icon ? icon : Image}
            aria-describedby={ariaDescribedbyId}
            {...iconProps}
          />
        )}
        {((colors && colors.length > 0) || showColorsColumn) && (
          <div
            className={`${cs.sheOptionColorsContainer} ${colorsClassName}`}
            style={colorsStyle}
          >
            {colors?.map((color: string, idx: number) => (
              <div
                key={color + idx + 1}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        )}
        <div
          className={`${cs.sheOptionInfoContainer} ${infoClassName}`}
          style={infoStyle}
        >
          <div className={cs.sheOptionInfoBlock}>
            {text && (
              <span className="she-text" aria-describedby={ariaDescribedbyId}>
                <Trans i18nKey={textTransKey}>{text}</Trans>
              </span>
            )}
            {description && (
              <span
                className={`${cs.sheOptionDescription} she-subtext`}
                aria-describedby={ariaDescribedbyId}
              >
                <Trans i18nKey={descriptionTransKey}>{description}</Trans>
              </span>
            )}
          </div>
          {(sideText?.length > 0 || sideDescription?.length > 0) && (
            <div className={`${cs.sheOptionExtraInfoBlock}`}>
              {sideText?.length > 0 && (
                <span className="she-text" aria-describedby={ariaDescribedbyId}>
                  <Trans i18nKey={sideTextTransKey}>{sideText}</Trans>
                </span>
              )}
              {sideDescription?.length > 0 && (
                <span
                  className={`${cs.sheOptionDescription} she-subtext`}
                  aria-describedby={ariaDescribedbyId}
                >
                  <Trans i18nKey={sideDescriptionTransKey}>
                    {sideDescription}
                  </Trans>
                </span>
              )}
            </div>
          )}
        </div>
        {tooltip && (
          <SheTooltip
            className={`${cs.sheOptionTooltipContainer} ${tooltipClassName}`}
            style={tooltipStyle}
            showDefaultIcon
            ariaDescribedbyId={ariaDescribedbyId}
            {...tooltip}
          />
        )}
      </div>
    </SheSkeleton>
  );
}
