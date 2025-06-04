export interface ISheImageUploader {
  isLoading?: boolean;
  contextName: string;
  contextId: number;
  fullWidth?: boolean;
  onUpload?: (data: any) => void;
}
