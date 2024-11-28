import { PropsWithChildren } from "react";

export interface IBaseComponent extends PropsWithChildren {
  id?: any;
  className?: string;
  styles?: string;
  isLoading?: boolean;
  disabled?: boolean;
}
