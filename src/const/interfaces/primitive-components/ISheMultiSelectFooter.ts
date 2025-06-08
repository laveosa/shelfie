import React, { ComponentPropsWithRef } from "react";

export interface ISheMultiSelectFooter extends ComponentPropsWithRef<any> {
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
  onSecondaryBtnClick?: () => void;
  onPrimaryBtnClick?: () => void;
}
