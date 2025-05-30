import { ISheBaseDialog } from "@/const/interfaces/dialogs/ISheBaseDialog.ts";
import { IDialogComponent } from "@/const/interfaces/dialogs/IDialogComponent.ts";

export interface IDialogSlice {
  isOpen: boolean;
  config: ISheBaseDialog | IDialogComponent | null;
}
