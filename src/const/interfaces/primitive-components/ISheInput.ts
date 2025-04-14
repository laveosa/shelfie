import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { InputProps } from "@/components/ui/input.tsx";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";
import { InputPatternEnum } from "@/const/enums/InputPatternEnum.ts";

export interface ISheInput extends IBaseComponent, InputProps {
  id?: any;
  label?: string;
  labelTransKey?: string;
  placeholderTransKey?: string;
  icon?: any;
  isSearch?: boolean;
  isValid?: boolean;
  showClearBtn?: boolean;
  fullWidth?: boolean;
  showError?: boolean;
  error?: string;
  errorTransKey?: string;
  strict?: boolean;
  pattern?: InputPatternEnum | any;
  tooltip?: ISheTooltip;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onDelay?: (value: any) => void;
}
