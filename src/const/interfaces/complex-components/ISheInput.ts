import { ReactNode } from "react";

import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { InputProps } from "@/components/ui/input.tsx";
import { ALIGN_OPTIONS, SIDE_OPTIONS } from "@radix-ui/react-popper";

export interface ISheInput extends IBaseComponent, InputProps {
  label?: string;
  labelTransKey?: string;
  placeholderTransKey?: string;
  icon?: ReactNode;
  isSearch?: boolean;
  isValid?: boolean;
  showClearBtn?: boolean;
  fullWidth?: boolean;
  showError?: boolean;
  error?: string;
  errorTransKey?: string;
  strict?: boolean;
  pattern?: any;
  tooltip?: string;
  tooltipTransKey?: string;
  tooltipSide?: (typeof SIDE_OPTIONS)[number];
  tooltipAlign?: (typeof ALIGN_OPTIONS)[number];
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onDelay?: (value: any) => void;
}
