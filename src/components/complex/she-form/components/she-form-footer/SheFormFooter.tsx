import React from "react";
import { Trans } from "react-i18next";

import cs from "./SheFormFooter.module.scss";
import { ISheFormFooter } from "@/const/interfaces/forms/ISheFormFooter.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function SheFormFooter({
  className,
  primaryTitle = "Submit",
  primaryTitleTransKey,
  primaryProps,
  hidePrimary,
  secondaryTitle = "Cancel",
  secondaryTitleTransKey,
  secondaryProps,
  hideSecondary,
  notDisabledSubmit,
  loading,
  isValid,
  footerPosition,
  onPrimary,
  onSecondary,
  ...props
}: ISheFormFooter): React.ReactNode {
  return (
    <div
      {...props}
      className={`${cs[className] || ""} ${cs.sheFormFooter} ${cs[footerPosition] || ""}`}
    >
      {!hideSecondary && (
        <SheButton
          {...secondaryProps}
          variant="secondary"
          type="button"
          minWidth="100px"
          onClick={onSecondary}
        >
          <Trans i18nKey={secondaryTitleTransKey}>{secondaryTitle}</Trans>
        </SheButton>
      )}
      {!hidePrimary && (
        <SheButton
          {...primaryProps}
          type="submit"
          loading={loading}
          disabled={!notDisabledSubmit && !isValid}
          minWidth="100px"
          onClick={onPrimary}
        >
          <Trans i18nKey={primaryTitleTransKey}>{primaryTitle}</Trans>
        </SheButton>
      )}
    </div>
  );
}
