import React from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";

export interface ISheFormFooter {
  footerClassName?: string;
  footerStyles?: React.CSSProperties;
  primaryBtnTitle?: string;
  primaryBtnTitleTransKey?: string;
  primaryBtnProps?: ISheButton;
  hidePrimaryBtn?: boolean;
  secondaryBtnTitle?: string;
  secondaryBtnTitleTransKey?: string;
  secondaryBtnProps?: ISheButton;
  hideSecondaryBtn?: boolean;
  notDisabledSubmit?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
  footerPosition?: DirectionEnum;
  hideFooter?: boolean;
  onPrimaryBtnClick?(): void;
  onSecondaryBtnClick?(): void;
}

export const SheFormFooterDefaultModel: ISheFormFooter = {
  footerClassName: undefined,
  footerStyles: undefined,
  primaryBtnTitle: undefined,
  primaryBtnTitleTransKey: undefined,
  primaryBtnProps: undefined,
  hidePrimaryBtn: undefined,
  secondaryBtnTitle: undefined,
  secondaryBtnTitleTransKey: undefined,
  secondaryBtnProps: undefined,
  hideSecondaryBtn: undefined,
  notDisabledSubmit: undefined,
  isLoading: undefined,
  isValid: undefined,
  footerPosition: undefined,
  onPrimaryBtnClick: undefined,
  onSecondaryBtnClick: undefined,
};
