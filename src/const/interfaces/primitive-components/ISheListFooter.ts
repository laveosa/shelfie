import React from "react";

import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";

export interface ISheListFooter {
  footerClassName?: string;
  footerStyle?: React.CSSProperties;
  hideSecondaryBtn?: boolean;
  secondaryBtnValue?: string;
  secondaryBtnValueTransKey?: string;
  secondaryBtnProps?: ISheButton;
  hidePrimaryBtn?: boolean;
  primaryBtnValue?: string;
  primaryBtnValueTransKey?: string;
  primaryBtnProps?: ISheButton;
  showFooter?: boolean;
  onSecondaryBtnClick?: () => void;
  onPrimaryBtnClick?: () => void;
}

export const SheListFooterDefaultModel = {
  footerClassName: undefined,
  footerStyle: undefined,
  hideSecondaryBtn: undefined,
  secondaryBtnValue: undefined,
  secondaryBtnValueTransKey: undefined,
  secondaryBtnProps: undefined,
  hidePrimaryBtn: undefined,
  primaryBtnValue: undefined,
  primaryBtnValueTransKey: undefined,
  primaryBtnProps: undefined,
  showFooter: undefined,
  onSecondaryBtnClick: undefined,
  onPrimaryBtnClick: undefined,
};
