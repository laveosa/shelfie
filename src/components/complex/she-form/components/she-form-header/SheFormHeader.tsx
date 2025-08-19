import { Trans } from "react-i18next";
import React, { JSX } from "react";

import cs from "./SheFormHeader.module.scss";
import { FormLabel } from "@/components/ui/form.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheFormHeader } from "@/const/interfaces/forms/ISheFormHeader.ts";

export default function SheFormHeader({
  headerClassName = "",
  headerStyles,
  icon,
  iconProps,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  headerPosition = DirectionEnum.CENTER,
  hideHeader,
}: ISheFormHeader): JSX.Element {
  // ==================================================================== LAYOUT
  if ((!icon && !title && !text && !description) || hideHeader) return null;

  return (
    <div
      className={`${cs.sheFormHeader} ${headerClassName} ${cs[headerPosition]}`}
      style={{ ...headerStyles }}
    >
      <SheIcon icon={icon} className={cs.sheIcon} {...iconProps} />
      {(title || text || description) && (
        <FormLabel>
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
    </div>
  );
}
