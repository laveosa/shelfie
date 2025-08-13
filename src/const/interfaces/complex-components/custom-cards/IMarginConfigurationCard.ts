export interface IMarginConfigurationCard {
  isLoading?: boolean;
  margin?: any;
  onAction?: (identifier: string, payload?: any) => void;
}
