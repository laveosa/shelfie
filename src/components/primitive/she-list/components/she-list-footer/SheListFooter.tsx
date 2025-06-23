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
  secondaryBtnProps,
  hidePrimaryBtn,
  primaryBtnValue = "Close",
  primaryBtnValueTransKey = "PLACE_VALID_TRANS_KEY",
  primaryBtnProps,
  showFooter,
  view,
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
    <div
      className={`${cs.sheListFooter} ${className} ${cs[view]}`}
      style={style}
    >
      <div className={cs.sheListFooterGroup}>
        {!hideSecondaryBtn && (
          <SheButton
            className={cs.sheListFooterItem}
            value={secondaryBtnValue}
            valueTransKey={secondaryBtnValueTransKey}
            variant={secondaryBtnProps?.variant || "ghost"}
            onClick={onSecondaryBtnClick}
            {...secondaryBtnProps}
          />
        )}
        {!hideSecondaryBtn && !hidePrimaryBtn && (
          <Separator
            className={cs.sheListFooterItemsSeparator}
            orientation="vertical"
          />
        )}
        {!hidePrimaryBtn && (
          <SheButton
            className={cs.sheListFooterItem}
            value={primaryBtnValue}
            valueTransKey={primaryBtnValueTransKey}
            variant={primaryBtnProps?.variant || "ghost"}
            role="presentation"
            onClick={onPrimaryBtnClick}
            {...primaryBtnProps}
          />
        )}
      </div>
    </div>
  );
}
