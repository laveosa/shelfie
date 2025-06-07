import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheMultiSelectItem.module.scss";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { CommandItem } from "@/components/ui/command.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { Image } from "lucide-react";

export default function SheMultiSelectItem({
  id,
  className = "",
  style,
  icon,
  iconProps,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  sideText,
  sideTextTransKey,
  sideDescription,
  sideDescriptionTransKey,
  value,
  isSelected,
  colors,
  disabled,
  isLoading,
  isItemsWithIcons,
  isItemsWithColors,
  ariaDescribedbyId,
  tooltip,
  toggleProps,
  onClick,
  ...props
}: ISheMultiSelectItem): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <CommandItem
      className={`${cs.sheMultiSelectItem} ${className} ${isSelected ? cs.sheMultiSelectItemSelected : ""}`}
      style={style}
      disabled={disabled || isLoading}
      onSelect={() => onClick(value)}
      {...props}
    >
      <div className={cs.sheMultiSelectItemContextContainer}>
        <div className={cs.sheMultiSelectItemToggleContainer}>
          <SheToggle checked={isSelected} {...toggleProps} />
        </div>
        {isItemsWithIcons && (
          <div className={cs.sheMultiSelectItemIconContainer}>
            <SheIcon
              icon={icon ? icon : Image}
              className={`${cs.iconBlock} ${!icon ? cs.iconPlaceholder : ""}`}
              aria-describedby={ariaDescribedbyId}
              {...iconProps}
            />
          </div>
        )}
        {isItemsWithColors && (
          <div className={cs.sheMultiSelectItemColorsContainer}>
            {colors?.map((color: string, idx: number) => (
              <div
                key={color + idx + 1}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        )}
        <div className={cs.sheMultiSelectItemInfoContainer}>
          <div className={cs.sheMultiSelectItemInfoBlock}>
            {text && (
              <span className="she-text">
                <Trans i18nKey={textTransKey}>{text}</Trans>
              </span>
            )}
            {description && (
              <span
                className={`${cs.sheMultiSelectItemDescription} she-subtext`}
              >
                <Trans i18nKey={descriptionTransKey}>{description}</Trans>
              </span>
            )}
          </div>
          {(sideText?.length > 0 || sideDescription?.length > 0) && (
            <div className={`${cs.sheMultiSelectItemExtraInfoBlock}`}>
              {sideText?.length > 0 && (
                <span className="she-text">
                  <Trans i18nKey={sideTextTransKey}>{sideText}</Trans>
                </span>
              )}
              {sideDescription?.length > 0 && (
                <span
                  className={`${cs.sheMultiSelectItemDescription} she-subtext`}
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
          <div
            className={`${cs.sheMultiSelectItemTooltipContainer} sheSelectItemTooltipContainer`}
          >
            <SheTooltip
              showDefaultIcon
              ariaDescribedbyId={ariaDescribedbyId}
              {...tooltip}
            />
          </div>
        )}
      </div>
    </CommandItem>
  );
}
