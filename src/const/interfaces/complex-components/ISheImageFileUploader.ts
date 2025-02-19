export interface ISheImageFileUploader {
  contextName: string;
  contextId: number;
  onUpload?: (data) => void;
}
