export interface ISheImageUploader {
  contextName: string;
  contextId: number;
  showBin?: boolean;
  onUpload?: (data) => void;
}
