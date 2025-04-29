import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";

import cs from "./SheToggle.module.scss";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";

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

  const [_checked, setChecked] = useState<boolean>(checked ?? false);

  useEffect(() => {
    if (typeof checked === "boolean" && checked !== _checked) {
      setChecked(checked);
    }
  }, [checked]);

  // ==================================================================== EVENT

  function onCheckedChangeHandler(value: boolean) {
    onChecked?.(value);
    setChecked(value);
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
      <div className={cs.sheToggleComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div
          className={`${cs.sheToggleControl} ${disabled || isLoading ? "disabled" : ""}`}
        >
          <SheSkeleton isLoading={isLoading} fullWidth>
            <SheIcon
              icon={icon}
              className={cs.iconBlock}
              aria-describedby={ariaDescribedbyId}
            />
            {type === SheToggleTypeEnum.CHECKBOX && (
              <Checkbox
                {...props}
                id={checkboxId}
                checked={_checked}
                aria-describedby={ariaDescribedbyId}
                disabled={disabled || isLoading}
                onCheckedChange={onCheckedChangeHandler}
              />
            )}
            {type === SheToggleTypeEnum.SWITCH && (
              <Switch
                {...props}
                id={checkboxId}
                checked={_checked}
                aria-describedby={ariaDescribedbyId}
                disabled={disabled || isLoading}
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
          </SheSkeleton>
        </div>
      </div>
    </div>
  );
}
