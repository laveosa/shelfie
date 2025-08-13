import React, { JSX } from "react";

import cs from "./SheRadioItem.module.scss";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { RadioGroupItem } from "@/components/ui/radio-group.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export default function SheRadioItem<T>({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  icon,
  value,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  disabled,
  isLoading,
  ariaDescribedbyId,
  tooltip,
  view,
  ...props
}: ISheRadioItem<T>): JSX.Element {
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <SheSkeleton
      skeletonClassName={cs.sheRadioItemContextSkeleton}
      isLoading={view === ComponentViewEnum.CARD && isLoading}
    >
      <div
        className={`${className} ${cs.sheRadioItem} ${isLoading || disabled ? "disabled" : ""} ${view ? cs[view] : ""} ${tooltip && tooltip.text?.length > 0 ? cs.withTooltip : ""}`}
        style={style}
      >
        <div className={cs.sheRadioItemCell}>
          <SheSkeleton
            skeletonClassName={cs.sheRadioItemTriggerSkeleton}
            isLoading={view !== ComponentViewEnum.CARD && isLoading}
          >
            <RadioGroupItem
              id={id}
              className={elementClassName}
              style={elementStyle}
              value={value as any}
              {...props}
            />
          </SheSkeleton>
        </div>
        <div className={cs.sheRadioItemContextContainer}>
          <SheSkeleton
            skeletonClassName={cs.sheRadioItemContextSkeleton}
            isLoading={view !== ComponentViewEnum.CARD && isLoading}
          >
            <label htmlFor={id} aria-describedby={ariaDescribedbyId}>
              {icon && (
                <div
                  className={`${cs.sheRadioItemCell} ${cs.sheRadioItemCellIcon}`}
                >
                  <SheIcon icon={icon} className={`${cs.iconBlock}`} />
                </div>
              )}
              <div
                className={`${cs.sheRadioItemCell} ${cs.sheRadioItemCellInfo}`}
              >
                <span className="she-text">
                  {translate(textTransKey, text)}
                </span>
                {description && (
                  <span
                    className="she-subtext"
                    aria-describedby={ariaDescribedbyId}
                  >
                    {translate(descriptionTransKey, description)}
                  </span>
                )}
              </div>
              {tooltip && (
                <div
                  className={`${cs.sheRadioItemCell} ${cs.sheRadioItemCellTooltip}`}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <SheTooltip
                    className={cs.sheRadioItemTooltip}
                    showDefaultIcon
                    ariaDescribedbyId={ariaDescribedbyId}
                    {...tooltip}
                  />
                </div>
              )}
            </label>
          </SheSkeleton>
        </div>
      </div>
    </SheSkeleton>
  );
}
