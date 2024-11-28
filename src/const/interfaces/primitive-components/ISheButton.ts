import { ButtonProps } from "@/components/ui/button.tsx";

export interface ISheButton extends ButtonProps {
  loading?: boolean;
  minWidth?: string;
  minHeight?: string;
}
