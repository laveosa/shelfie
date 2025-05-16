import React, { JSX } from "react";

import cs from "./SheSelectItem.module.scss";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { SelectItem } from "@/components/ui/select.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { Image } from "lucide-react";

export default function SheSelectItem({
  id,
  className = "",
  style,
  icon,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  sideText,
  sideTextTransKey,
  sideDescription,
  sideDescriptionTransKey,
  colors,
  disabled,
  isLoading,
  showSelectIcon,
  isItemsWithIcons,
  isItemsWithColors,
  ariaDescribedbyId,
  tooltip,
}: ISheSelectItem): JSX.Element {
  const { translate } = useAppTranslation();

  return (
    <SelectItem
      id={id}
      className={`${cs.sheSelectItem} ${isLoading || disabled ? "disabled" : ""} ${showSelectIcon ? cs.sheShowSelectIcon : ""}`}
      value={id}
      defaultValue={id}
      style={style}
    >
      <div className={`${cs.sheSelectItemContextContainer} ${className}`}>
        {isItemsWithIcons && (
          <div
            className={`${cs.sheSelectItemIconContainer} sheSelectItemIconContainer`}
          >
            <SheIcon
              icon={icon ? icon : Image}
              className={`${cs.iconBlock} ${!icon ? cs.iconPlaceholder : ""}`}
              aria-describedby={ariaDescribedbyId}
            />
          </div>
        )}
        {isItemsWithColors && (
          <div
            className={`${cs.sheSelectItemColorsContainer} sheSelectItemColorsContainer`}
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
          className={`${cs.sheSelectItemInfoContainer} sheSelectItemInfoContainer`}
        >
          <div className={cs.sheSelectItemInfoBlock}>
            <span className="she-text">{translate(textTransKey, text)}</span>
            {description && (
              <span
                className={`${cs.sheSelectItemDescription} sheSelectItemDescription she-subtext`}
              >
                {translate(descriptionTransKey, description)}
              </span>
            )}
          </div>
          {(sideText?.length > 0 || sideDescription?.length > 0) && (
            <div
              className={`${cs.sheSelectItemExtraInfoBlock} sheSelectItemExtraInfoBlock`}
            >
              {sideText?.length > 0 && (
                <span className="she-text">
                  {translate(sideTextTransKey, sideText)}
                </span>
              )}
              {sideDescription?.length > 0 && (
                <span
                  className={`${cs.sheSelectItemDescription} sheSelectItemDescription she-subtext`}
                >
                  {translate(sideDescriptionTransKey, sideDescription)}
                </span>
              )}
            </div>
          )}
        </div>
        {tooltip && (
          <div
            className={`${cs.sheSelectItemTooltipContainer} sheSelectItemTooltipContainer`}
          >
            <SheTooltip
              {...tooltip}
              showDefaultIcon
              ariaDescribedbyId={ariaDescribedbyId}
            />
          </div>
        )}
      </div>
    </SelectItem>
  );
}
