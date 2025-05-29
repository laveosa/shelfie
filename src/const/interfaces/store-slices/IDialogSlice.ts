import { DialogConfig } from "@/utils/services/DialogService.tsx";

export interface IDialogSlice {
  isOpen: boolean;
  config: DialogConfig | null;
}
