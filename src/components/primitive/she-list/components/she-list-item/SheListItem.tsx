import { Trans } from "react-i18next";
import React, { JSX } from "react";

import cs from "./SheListItem.module.scss";
import { ISheListItem } from "@/const/interfaces/primitive-components/ISheListItem.ts";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { CommandItem } from "@/components/ui/command.tsx";
import { Image } from "lucide-react";

export default function SheListItem<T>({
  id,
  className = "",
  style,
  icon,
  iconProps,
  colors,
  value,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  sideText,
  sideTextTransKey,
  sideDescription,
  sideDescriptionTransKey,
  isSelected,
  isDnd,
  disabled,
  isLoading,
  isItemsWithIcons,
  isItemsWithColors,
  tooltip,
  toggleProps,
  ariaDescribedbyId,
  mode,
  view,
  onClick,
  onSelect,
  ...props
}: ISheListItem<T>): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <CommandItem
      className={`${cs.sheListItem} ${className} ${cs[view]} ${isSelected ? cs.sheListItemSelected : ""}`}
      style={style}
      disabled={disabled || isLoading}
      onSelect={() => onClick(value)}
      {...props}
    >
      <div className={cs.sheListItemContextContainer}>
        {mode === "multi" && (
          <div className={cs.sheListItemToggleContainer}>
            <SheToggle
              checked={isSelected}
              {...toggleProps}
              onChecked={onSelect}
            />
          </div>
        )}
        {isItemsWithIcons && (
          <div className={cs.sheListItemIconContainer}>
            <SheIcon
              icon={icon ? icon : Image}
              className={`${cs.iconBlock} ${!icon ? cs.iconPlaceholder : ""}`}
              aria-describedby={ariaDescribedbyId}
              {...iconProps}
            />
          </div>
        )}
        {isItemsWithColors && (
          <div className={cs.sheListItemColorsContainer}>
            {colors?.map((color: string, idx: number) => (
              <div
                key={color + idx + 1}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        )}
        <div className={cs.sheListItemInfoContainer}>
          <div className={cs.sheListItemInfoBlock}>
            {text && (
              <span className="she-text">
                <Trans i18nKey={textTransKey}>{text}</Trans>
              </span>
            )}
            {description && (
              <span className={`${cs.sheListItemDescription} she-subtext`}>
                <Trans i18nKey={descriptionTransKey}>{description}</Trans>
              </span>
            )}
          </div>
          {(sideText?.length > 0 || sideDescription?.length > 0) && (
            <div className={`${cs.sheListItemInfoBlock}`}>
              {sideText?.length > 0 && (
                <span className="she-text">
                  <Trans i18nKey={sideTextTransKey}>{sideText}</Trans>
                </span>
              )}
              {sideDescription?.length > 0 && (
                <span className={`${cs.sheListItemDescription} she-subtext`}>
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
            className={`${cs.sheListItemTooltipContainer} sheSelectItemTooltipContainer`}
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
