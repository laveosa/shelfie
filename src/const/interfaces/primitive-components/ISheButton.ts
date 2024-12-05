import { ButtonProps } from "@/components/ui/button.tsx";
import { LucideIcon } from "lucide-react";

export interface ISheButton extends ButtonProps {
  loading?: boolean;
  minWidth?: string;
  minHeight?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconSize?: number;
  iconClassName?: string;
}
