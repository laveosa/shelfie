import { Trans } from "react-i18next";
import React from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheFormHeader } from "@/const/interfaces/forms/ISheFormHeader.ts";
import { FormLabel } from "@/components/ui/form.tsx";
import cs from "./SheFormHeader.module.scss";

export default function SheFormHeader({
  className,
  icon,
  image,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  headerPosition = DirectionEnum.CENTER,
}: ISheFormHeader): React.ReactNode {
  return (
    <>
      {(icon || image || title || text || description) && (
        <div
          className={`${className || ""} ${cs.sheFormHeader} ${cs[headerPosition]}`}
        >
          {image && (
            <div className={cs.sheImage}>
              <img src={image} alt="form image" />
            </div>
          )}
          {icon && <div className={cs.sheFormIcon}>{icon}</div>}
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
      )}
    </>
  );
}
