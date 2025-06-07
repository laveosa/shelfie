import React, { ComponentPropsWithRef } from "react";

export interface ISheMultiSelectFooter extends ComponentPropsWithRef<any> {
  className?: string;
  style?: React.CSSProperties;
  selectedValues?: any[];
  hideSecondaryBtn?: boolean;
  secondaryBtnValue?: string;
  secondaryBtnValueTransKey?: string;
  hidePrimaryBtn?: boolean;
  primaryBtnValue?: string;
  primaryBtnValueTransKey?: string;
  onSecondaryBtnClick?: () => void;
  onPrimaryBtnClick?: () => void;
}
