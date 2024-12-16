import { PropsWithChildren } from "react";

export interface IBaseComponent extends PropsWithChildren {
  id?: any;
  transKey?: string;
  className?: string;
  styles?: string;
  isLoading?: boolean;
  disabled?: boolean;
}
