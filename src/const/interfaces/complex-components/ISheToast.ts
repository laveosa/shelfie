export interface ISheToast {
  id?: string;
  title?: string;
  message: string;
  description?: string;
  dismiss?: () => void;
  type?: "success" | "error" | "info" | "warning";
}
