import React from "react";

export interface ISheMultiSelectFooter {
  footerClassName?: string;
  footerStyle?: React.CSSProperties;
  selectedValues?: any[];
  hideSecondaryBtn?: boolean;
  secondaryBtnValue?: string;
  secondaryBtnValueTransKey?: string;
  hidePrimaryBtn?: boolean;
  primaryBtnValue?: string;
  primaryBtnValueTransKey?: string;
  showFooter?: boolean;
  onSecondaryBtnClick?(event: React.MouseEvent): void;
  onPrimaryBtnClick?(event: React.MouseEvent): void;
}

export const SheMultiSelectFooterDefaultModel: ISheMultiSelectFooter = {
  footerClassName: undefined,
  footerStyle: undefined,
  selectedValues: undefined,
  hideSecondaryBtn: undefined,
  secondaryBtnValue: undefined,
  secondaryBtnValueTransKey: undefined,
  hidePrimaryBtn: undefined,
  primaryBtnValue: undefined,
  primaryBtnValueTransKey: undefined,
  showFooter: undefined,
  onSecondaryBtnClick: undefined,
  onPrimaryBtnClick: undefined,
};
