import React, { JSX } from "react";

import cs from "./SheFormFooter.module.scss";
import { ISheFormFooter } from "@/const/interfaces/forms/ISheFormFooter.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

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
          {...secondaryBtnProps}
          value={secondaryBtnTitle}
          valueTransKey={secondaryBtnTitleTransKey}
          variant="secondary"
          type="button"
          minWidth="100px"
          onClick={onSecondaryBtnClick}
        />
      )}
      {!hidePrimaryBtn && (
        <SheButton
          {...primaryBtnProps}
          value={primaryBtnTitle}
          valueTransKey={primaryBtnTitleTransKey}
          type="submit"
          isLoading={isLoading}
          disabled={!notDisabledSubmit && !isValid}
          minWidth="100px"
          onClick={onPrimaryBtnClick}
        />
      )}
    </div>
  );
}
