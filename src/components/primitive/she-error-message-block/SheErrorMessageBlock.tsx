import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheErrorMessageBlock.module.scss";
import { ISheErrorMessageBlock } from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheErrorMessageBlock({
  errorMessageBlockClassName = "",
  errorMessageBlockStyle,
  errorMessage,
  errorMessageTransKey,
  errorMessageIcon,
  hideErrorMessage,
}: ISheErrorMessageBlock): JSX.Element {
  // ==================================================================== LAYOUT
  if (hideErrorMessage || !errorMessage || errorMessage.length === 0)
    return null;

  return (
    <div
      className={`${cs.sheErrorMessageBlock} ${errorMessageBlockClassName}`}
      style={errorMessageBlockStyle}
    >
      <SheIcon icon={errorMessageIcon} />
      <span className="she-text-error" role="alert" aria-live="assertive">
        <Trans i18nKey={errorMessageTransKey}>{errorMessage}</Trans>
      </span>
    </div>
  );
}
