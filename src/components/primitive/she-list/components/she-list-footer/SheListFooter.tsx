import { JSX } from "react";

import cs from "./SheListFooter.module.scss";
import { ISheListFooter } from "@/const/interfaces/primitive-components/ISheListFooter.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export default function SheListFooter({
  footerClassName: className = "",
  footerStyle: style,
  hideSecondaryBtn,
  secondaryBtnValue = "Clear",
  secondaryBtnValueTransKey = "PLACE_VALID_TRANS_KEY",
  hidePrimaryBtn,
  primaryBtnValue = "Close",
  primaryBtnValueTransKey = "PLACE_VALID_TRANS_KEY",
  showFooter,
  onSecondaryBtnClick,
  onPrimaryBtnClick,
}: ISheListFooter): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!showFooter || (hideSecondaryBtn && hidePrimaryBtn)) {
    return null;
  }

  return (
    <div className={`${cs.sheListFooter} ${className}`} style={style}>
      <div className={cs.sheListFooterGroup}>
        {!hideSecondaryBtn && (
          <>
            <SheButton
              className={cs.sheListFooterItem}
              value={secondaryBtnValue}
              valueTransKey={secondaryBtnValueTransKey}
              variant="ghost"
              size="small"
              onClick={onSecondaryBtnClick}
            />
            <Separator
              className={cs.sheListFooterItemsSeparator}
              orientation="vertical"
            />
          </>
        )}
        {!hidePrimaryBtn && (
          <SheButton
            className={cs.sheListFooterItem}
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
