export interface ISheImageUploader {
  contextName: string;
  contextId: number;
  onUpload?: (data) => void;
}
