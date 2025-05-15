import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheDescriptionBlock.module.scss";
import { ISheDescriptionBlock } from "@/const/interfaces/primitive-components/ISheDescriptionBlock.ts";

export default function SheDescriptionBlock({
  className = "",
  style,
  description,
  descriptionTransKey,
  showDescription = true,
}: ISheDescriptionBlock): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!showDescription || !description || description.length === 0) return null;

  return (
    <div className={`${cs.sheDescriptionBlock} ${className}`} style={style}>
      <span className="she-subtext" role="description">
        <Trans i18nKey={descriptionTransKey}>{description}</Trans>
      </span>
    </div>
  );
}
