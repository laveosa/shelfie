export interface ISheToast {
  id?: string;
  title?: string;
  titleTransKey?: string;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  dismissButton?: () => void;
  type?: "success" | "error" | "info" | "warning";
}
