export interface IMarginConfigurationCard<T> {
  className?: string;
  data?: any;
  isConfigurationCard?: boolean;
  onSubmit?: (data: T) => void;
  onCancel?: () => void;
}
