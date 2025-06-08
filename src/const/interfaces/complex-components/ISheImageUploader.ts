export interface ISheImageUploader {
  isLoading?: boolean;
  ref?: React.Ref<any>;
  contextName: string;
  contextId: number;
  fullWidth?: boolean;
  hideUploadButton?: boolean;
  onUpload?: (data: any) => void;
}
