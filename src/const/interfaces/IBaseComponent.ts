import { ComponentPropsWithRef } from "react";

export interface IBaseComponent extends ComponentPropsWithRef<any> {
  id?: any;
  transKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}
