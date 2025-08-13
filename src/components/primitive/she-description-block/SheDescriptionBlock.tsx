import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheDescriptionBlock.module.scss";
import { ISheDescriptionBlock } from "@/const/interfaces/primitive-components/ISheDescriptionBlock.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheDescriptionBlock({
  descriptionBlockClassName = "",
  descriptionBlockStyle,
  description,
  descriptionTransKey,
  hideDescription,
  descriptionIcon,
}: ISheDescriptionBlock): JSX.Element {
  // ==================================================================== LAYOUT
  if (hideDescription || !description || description.length === 0) return null;

  return (
    <div
      className={`${cs.sheDescriptionBlock} ${descriptionBlockClassName}`}
      style={descriptionBlockStyle}
    >
      <SheIcon className={cs.iconBlock} icon={descriptionIcon} />
      <span className="she-subtext" role="description">
        <Trans i18nKey={descriptionTransKey}>{description}</Trans>
      </span>
    </div>
  );
}
