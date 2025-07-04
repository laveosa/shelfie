export interface ISelectMarginCard {
  isLoading?: boolean;
  margins?: any[];
  onAction?: (identifier: string, payload?: any) => void;
}
