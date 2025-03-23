import { Trans } from "react-i18next";
import React from "react";

import { SheFormHeaderPositionEnum } from "@/const/enums/SheFormHeaderPositionEnum.ts";
import { ISheFormHeader } from "@/const/interfaces/forms/ISheFormHeader.ts";
import { FormLabel } from "@/components/ui/form.tsx";
import cs from "./SheFormHeader.module.scss";

export default function SheFormHeader({
  className,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  headerPosition = SheFormHeaderPositionEnum.CENTER,
}: ISheFormHeader): React.ReactNode {
  return (
    <>
      {(title || text || description) && (
        <FormLabel
          className={`${className || ""} ${cs.sheFormHeader} ${cs[headerPosition]}`}
        >
          {title && (
            <span className="she-title">
              <Trans i18nKey={titleTransKey}>{title}</Trans>
            </span>
          )}
          {text && (
            <span className="she-text">
              <Trans i18nKey={textTransKey}>{text}</Trans>
            </span>
          )}
          {description && (
            <span className="she-subtext">
              <Trans i18nKey={descriptionTransKey}>{description}</Trans>
            </span>
          )}
        </FormLabel>
      )}
    </>
  );
}
