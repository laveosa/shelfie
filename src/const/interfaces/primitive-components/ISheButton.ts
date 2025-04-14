import { ButtonProps } from "@/components/ui/button.tsx";
import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export interface ISheButton extends IBaseComponent, ButtonProps {
  value?: string;
  valueTransKey?: string;
  loading?: boolean;
  icon?: any;
  iconPosition?: DirectionEnum;
  iconSize?: number;
  iconClassName?: string;
}
