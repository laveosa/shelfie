export interface ISheImageUploader {
  isLoading?: boolean;
  contextName: string;
  contextId: number;
  onUpload?: (data: any) => void;
}
