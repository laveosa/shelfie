import { ISheBaseDialog } from "@/const/interfaces/dialogs/ISheBaseDialog.ts";

export interface ISheConfirmationDialog extends ISheBaseDialog {
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
}
