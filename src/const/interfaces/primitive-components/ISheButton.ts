import { LucideIcon } from "lucide-react";
import { ButtonProps } from "@/components/ui/button.tsx";
import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";

export interface ISheButton extends IBaseComponent, ButtonProps {
  value?: string;
  valueTransKey?: string;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconSize?: number;
  iconClassName?: string;
}
