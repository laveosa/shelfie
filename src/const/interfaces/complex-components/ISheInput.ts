import { ReactNode } from "react";

import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { InputProps } from "@/components/ui/input.tsx";

export interface ISheInput extends IBaseComponent, InputProps {
  label?: string;
  icon?: ReactNode;
  error?: string;
  tooltip?: string;
  showTooltip?: boolean;
  showCleatBtn?: boolean;
  isSearch?: boolean;
  onChange?: (value: any) => any;
  onBlur?: (value: any) => any;
  onDelay?: (value: any) => any;
}
