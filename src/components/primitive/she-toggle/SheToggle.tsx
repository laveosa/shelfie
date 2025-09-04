import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";

import cs from "./SheToggle.module.scss";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import useValueWithEvent from "@/utils/hooks/useValueWithEvent.ts";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function SheToggle(props: ISheToggle): JSX.Element {
  // ==================================================================== PROPS
  const {
    checked,
    text,
    textTransKey,
    iconProps,
    type = SheToggleTypeEnum.CHECKBOX,
    isLoading,
    disabled,
    onChecked,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheToggle,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_checked, setChecked] = useState<boolean>(checked ?? false);

  // ==================================================================== UTILITIES
  const { ariaDescribedbyId, updateFormValue } =
    useComponentUtilities<ISheToggle>({
      props,
      identifier: "SheToggle",
    });
  const { eventHandler, valueHandler } = useValueWithEvent<
    React.MouseEvent,
    boolean
  >(onCheckedChangeHandler);
  const checkboxId = generateId(6);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (typeof checked === "boolean" && checked !== _checked) {
      setChecked(checked);
    }
  }, [checked]);

  // ==================================================================== EVENT HANDLERS
  function onCheckedChangeHandler(value: boolean, event?: React.MouseEvent) {
    setChecked(value);
    updateFormValue(value);
    onChecked?.(value, {
      value,
      model: props,
      event,
    });
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${cs.sheToggle} ${shePrimitiveComponentWrapperProps.className} ${type === SheToggleTypeEnum.SWITCH ? cs.sheToggleViewSwitch : cs.sheToggleViewCheckbox}`}
      ariaDescribedbyId={ariaDescribedbyId}
      iconProps={{ className: `${iconProps?.className} ${cs.sheToggleIcon}` }}
      iconPosition="out"
      showClearBtn={false}
    >
      <div
        className={`${cs.sheToggleControl} ${disabled || isLoading ? "disabled" : ""} componentTriggerElement`}
      >
        {type === SheToggleTypeEnum.CHECKBOX && (
          <Checkbox
            id={checkboxId}
            checked={_checked}
            aria-describedby={ariaDescribedbyId}
            disabled={disabled || isLoading}
            onClick={eventHandler}
            onCheckedChange={valueHandler}
          />
        )}
        {type === SheToggleTypeEnum.SWITCH && (
          <Switch
            id={checkboxId}
            checked={_checked}
            aria-describedby={ariaDescribedbyId}
            disabled={disabled || isLoading}
            onClick={eventHandler}
            onCheckedChange={valueHandler}
          />
        )}
        {text && text.length > 0 && (
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
          </label>
        )}
      </div>
    </ShePrimitiveComponentWrapper>
  );
}
