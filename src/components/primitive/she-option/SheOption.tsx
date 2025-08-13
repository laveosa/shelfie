import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import cs from "./SheOption.module.scss";
import {
  ISheOption,
  SheOptionDefaultModel,
} from "@/const/interfaces/primitive-components/ISheOption.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { Image } from "lucide-react";

export default function SheOption<T>(props: ISheOption<T>): JSX.Element {
  const {
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
    ...restProps
  } = props;

  const [_isSelected, setIsSelected] = useState<boolean>(null);

  useEffect(() => {
    if (!_.isEqual(isSelected, _isSelected)) setIsSelected(isSelected);
  }, [isSelected]);

  // ==================================================================== EVENT

  function onClickHandler(event: React.MouseEvent) {
    if (checkOnClick && mode === "multiple") {
      setIsSelected((prevState) => {
        const tmpIsSelected = !prevState;
        onClick?.(_getOutputEventModel(value, event));
        onCheck?.(_getOutputEventModel(value, event, tmpIsSelected));
        return tmpIsSelected;
      });
    } else {
      onClick?.(_getOutputEventModel(value, event));
    }
  }

  function onCheckHandler(value: boolean, { event }) {
    event.stopPropagation();
    setIsSelected((prevState) => {
      const tmpIsSelected = !prevState;
      onCheck?.(_getOutputEventModel(value, event, tmpIsSelected));
      return tmpIsSelected;
    });
  }

  // ==================================================================== PRIVATE

  function _getOutputEventModel(
    value: any,
    event: React.MouseEvent,
    selected: boolean = _isSelected,
  ) {
    return {
      value,
      model: {
        ...props,
        isSelected: selected,
      },
      event,
    };
  }

  // ==================================================================== RENDER

  return (
    <SheSkeleton isLoading={isLoading} fullWidth>
      <div
        className={`${cs.sheOption} ${className} ${fullWidth ? cs.fullWidth : ""} ${cs[view]} ${mode === "single" && isSelected ? cs.optionSelected : ""} ${disabled || isLoading ? "disabled" : ""}`}
        style={{
          minWidth,
          maxWidth,
          ...style,
        }}
        role="option"
        onClick={onClickHandler}
        {...restProps}
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
