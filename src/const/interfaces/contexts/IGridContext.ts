export interface IGridContext {
  loadingRow?: boolean;
  columnsPreferences?: any;
  onApplyColumns?: (data: any) => void;
  onDefaultColumns?: () => void;
}
