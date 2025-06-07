import { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheMultiSelectFooter.module.scss";
import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { ISheMultiSelectFooter } from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";
import { Separator } from "@/components/ui/separator.tsx";

export default function SheMultiSelectFooter({
  className = "",
  styles,
  selectedValues,
  hideSecondaryBtn,
  secondaryBtnValue = "Clear",
  secondaryBtnValueTransKey = "PLACE_VALID_TRANS_KEY",
  hidePrimaryBtn,
  primaryBtnValue = "Close",
  primaryBtnValueTransKey = "PLACE_VALID_TRANS_KEY",
  onSecondaryBtnClick,
  onPrimaryBtnClick,
}: ISheMultiSelectFooter): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  if (hideSecondaryBtn && hideSecondaryBtn) {
    return;
  }

  return (
    <div className={`${cs.sheMultiSelectFooter} ${className}`} style={styles}>
      <CommandSeparator />
      <CommandGroup>
        <div className={cs.sheMultiSelectFooterGroup}>
          {!hideSecondaryBtn && selectedValues?.length > 0 && (
            <>
              <CommandItem
                className={cs.sheMultiSelectFooterItem}
                onSelect={onSecondaryBtnClick}
              >
                <span className="she-text">
                  <Trans i18nKey={secondaryBtnValueTransKey}>
                    {secondaryBtnValue}
                  </Trans>
                </span>
              </CommandItem>
              <Separator
                className={cs.sheMultiSelectFooterItemsSeparator}
                orientation="vertical"
              />
            </>
          )}
          {!hidePrimaryBtn && (
            <CommandItem
              className={cs.sheMultiSelectFooterItem}
              onSelect={onPrimaryBtnClick}
            >
              <span className="she-text">
                <Trans i18nKey={primaryBtnValueTransKey}>
                  {primaryBtnValue}
                </Trans>
              </span>
            </CommandItem>
          )}
        </div>
      </CommandGroup>
    </div>
  );
}
