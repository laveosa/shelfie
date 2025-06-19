import { JSX } from "react";

import cs from "./SheMultiSelectFooter.module.scss";
import { ISheMultiSelectFooter } from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";
import { Separator } from "@/components/ui/separator.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function SheMultiSelectFooter({
  footerClassName: className = "",
  footerStyle: style,
  selectedValues,
  hideSecondaryBtn,
  secondaryBtnValue = "Clear",
  secondaryBtnValueTransKey = "PLACE_VALID_TRANS_KEY",
  hidePrimaryBtn,
  primaryBtnValue = "Close",
  primaryBtnValueTransKey = "PLACE_VALID_TRANS_KEY",
  showFooter,
  onSecondaryBtnClick,
  onPrimaryBtnClick,
}: ISheMultiSelectFooter): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  if (!showFooter || (hideSecondaryBtn && hidePrimaryBtn)) {
    return null;
  }

  return (
    <div className={`${cs.sheMultiSelectFooter} ${className}`} style={style}>
      <div className={cs.sheMultiSelectFooterGroup}>
        {!hideSecondaryBtn && selectedValues?.length > 0 && (
          <>
            <SheButton
              className={cs.sheMultiSelectFooterItem}
              value={secondaryBtnValue}
              valueTransKey={secondaryBtnValueTransKey}
              variant="ghost"
              size="small"
              onClick={onSecondaryBtnClick}
            />
            <Separator
              className={cs.sheMultiSelectFooterItemsSeparator}
              orientation="vertical"
            />
          </>
        )}
        {!hidePrimaryBtn && (
          <SheButton
            className={cs.sheMultiSelectFooterItem}
            value={primaryBtnValue}
            valueTransKey={primaryBtnValueTransKey}
            variant="ghost"
            size="small"
            role="presentation"
            onClick={onPrimaryBtnClick}
          />
        )}
      </div>
    </div>
  );
}
