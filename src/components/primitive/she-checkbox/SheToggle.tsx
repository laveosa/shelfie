import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";

import cs from "./SheToggle.module.scss";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";
import { generateId, isSheIconConfig } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/complex/she-tooltip/SheTooltip.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Switch } from "@/components/ui/switch.tsx";

export default function SheToggle({
  className,
  checked,
  label,
  labelTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  minWidth,
  maxWidth,
  fullWidth,
  icon,
  type = SheToggleTypeEnum.CHECKBOX,
  view,
  tooltip,
  isLoading,
  disabled,
  required,
  style,
  onChecked,
  ...props
}: ISheToggle): JSX.Element {
  const ariaDescribedbyId = `${generateId()}_CHECKBOX_ID`;
  const checkboxId = generateId(6);

  const [_checked, setChecked] = useState<boolean>(null);

  useEffect(() => {
    if (typeof checked === "boolean" && checked !== _checked) {
      setChecked(checked);
    }
  }, [checked]);

  // ==================================================================== EVENT

  function onCheckedChangeHandler(value: boolean) {
    if (onChecked) onChecked(value);
    setChecked(!_checked);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <div
      className={`${className || ""} ${cs.sheToggle || ""} ${cs[view] || ""} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <SheTooltip {...tooltip}>
        <div className={cs.sheToggleComponent}>
          {label && (
            <label className="she-text" aria-describedby={ariaDescribedbyId}>
              <Trans i18nKey={labelTransKey}>{label}</Trans>
            </label>
          )}
          <div
            className={`${cs.sheToggleControl} ${disabled || isLoading ? "disabled" : ""}`}
          >
            {icon &&
              (isSheIconConfig(icon) ? (
                <SheIcon
                  {...icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
              ) : (
                <SheIcon
                  icon={icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
              ))}
            {type === SheToggleTypeEnum.CHECKBOX && (
              <Checkbox
                {...props}
                checked={_checked}
                id={checkboxId}
                aria-describedby={ariaDescribedbyId}
                onCheckedChange={onCheckedChangeHandler}
              />
            )}
            {type === SheToggleTypeEnum.SWITCH && (
              <Switch
                {...props}
                checked={_checked}
                id={checkboxId}
                aria-describedby={ariaDescribedbyId}
                onCheckedChange={onCheckedChangeHandler}
              />
            )}
            <label
              htmlFor={checkboxId}
              className={cs.sheToggleContextBlock}
              aria-describedby={ariaDescribedbyId}
            >
              {text && (
                <span className="she-text">
                  <Trans i18nKey={textTransKey}>{text}</Trans>
                </span>
              )}
              {description && (
                <span className="she-subtext">
                  <Trans i18nKey={descriptionTransKey}>{description}</Trans>
                </span>
              )}
            </label>
          </div>
        </div>
      </SheTooltip>
    </div>
  );
}
