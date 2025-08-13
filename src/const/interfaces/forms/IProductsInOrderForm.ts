export interface IProductsInOrderForm<T> {
  className?: string;
  data?: any;
  onSubmit?: (data: T) => void;
  onDelete?: () => void;
}
