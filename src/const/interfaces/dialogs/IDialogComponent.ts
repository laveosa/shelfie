import { ReactNode } from "react";

export interface IDialogComponent {
  component: ReactNode;
  type: string;
  props?: Record<string, any>;
}
