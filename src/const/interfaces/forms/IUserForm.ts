export interface IUserForm<T> {
  data?: T;
  genders?: string[];
  positions?: any[];
  onSubmit?: (data: T) => void;
  onCancel?: (data: T) => void;
}
