import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export interface IGridContext {
  loadingRow?: boolean;
  columnsPreferences?: PreferencesModel;
  onApplyColumns?: (data: any) => void;
  onDefaultColumns?: () => void;
}
