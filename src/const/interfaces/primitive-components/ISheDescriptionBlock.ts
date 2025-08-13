import React from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheDescriptionBlock {
  descriptionBlockClassName?: string;
  descriptionBlockStyle?: React.CSSProperties;
  description?: string;
  descriptionTransKey?: string;
  hideDescription?: boolean;
  descriptionIcon?: Partial<ISheIcon> | string | React.FC<any>;
}

export const SheDescriptionBlockDefaultModel: ISheDescriptionBlock = {
  descriptionBlockClassName: undefined,
  descriptionBlockStyle: undefined,
  description: undefined,
  descriptionTransKey: undefined,
  hideDescription: undefined,
  descriptionIcon: undefined,
};
