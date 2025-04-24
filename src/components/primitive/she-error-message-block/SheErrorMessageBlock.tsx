import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheErrorMessageBlock.module.scss";
import { ISheErrorMessageBlock } from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";

export function SheErrorMessageBlock({
  className = "",
  style,
  error,
  errorTransKey,
  showError,
}: ISheErrorMessageBlock): JSX.Element {
  return (
    <>
      {showError && error && (
        <div
          className={`${cs.sheErrorMessageBlock} ${className}`}
          style={style}
        >
          <span className="she-text-error">
            <Trans i18nKey={errorTransKey}>{error}</Trans>
          </span>
        </div>
      )}
    </>
  );
}
