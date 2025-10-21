import React, { JSX } from "react";

import cs from "./SheFormFooter.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheFormFooter } from "@/const/interfaces/forms/ISheFormFooter.ts";

export default function SheFormFooter({
  footerClassName = "",
  footerStyles,
  primaryBtnTitle = "Submit",
  primaryBtnTitleTransKey = "PLACE_TRANS_KEY",
  primaryBtnProps,
  hidePrimaryBtn,
  secondaryBtnTitle = "Cancel",
  secondaryBtnTitleTransKey = "PLACE_TRANS_KEY",
  secondaryBtnProps,
  hideSecondaryBtn,
  notDisabledSubmit,
  isLoading,
  isValid,
  footerPosition = DirectionEnum.CENTER,
  hideFooter,
  onPrimaryBtnClick,
  onSecondaryBtnClick,
}: ISheFormFooter): JSX.Element {
  // ==================================================================== LAYOUT
  if ((hidePrimaryBtn && hideSecondaryBtn) || hideFooter) return null;

  return (
    <div
      className={`${cs.sheFormFooter} ${footerClassName}  ${cs[footerPosition]}`}
      style={{ ...footerStyles }}
    >
      {!hideSecondaryBtn && (
        <SheButton
          value={secondaryBtnTitle}
          valueTransKey={secondaryBtnTitleTransKey}
          variant="secondary"
          type="button"
          minWidth="100px"
          {...secondaryBtnProps}
          onClick={onSecondaryBtnClick}
        />
      )}
      {!hidePrimaryBtn && (
        <SheButton
          value={primaryBtnTitle}
          valueTransKey={primaryBtnTitleTransKey}
          isLoading={isLoading}
          type="submit"
          minWidth="100px"
          {...primaryBtnProps}
          disabled={
            (!notDisabledSubmit && !isValid) ||
            (!notDisabledSubmit && primaryBtnProps.disabled)
          }
          onClick={onPrimaryBtnClick}
        />
      )}
    </div>
  );
}
