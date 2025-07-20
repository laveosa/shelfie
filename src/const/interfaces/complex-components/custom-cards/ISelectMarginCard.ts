export interface ISelectMarginCard {
  isLoading?: boolean;
  isMarginListGridLoading?: boolean;
  margins?: any[];
  onAction?: (identifier: string, payload?: any) => void;
}
