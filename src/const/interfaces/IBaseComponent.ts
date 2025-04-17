import { ComponentPropsWithRef } from "react";

export interface IBaseComponent extends ComponentPropsWithRef<"div"> {
  transKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}
