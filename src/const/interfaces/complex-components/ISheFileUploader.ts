import { UploaderViewMode } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts"; // Use existing model

export interface ISheFileUploader {
  isLoading?: boolean;
  contextName?: string;
  contextId?: number;
  fullWidth?: boolean;
  hideUploadButton?: boolean;
  viewMode?: UploaderViewMode;
  acceptedFileTypes?: Record<string, string[]>;
  maxFiles?: number;
  onUpload?: (uploadModel: UploadPhotoModel) => void;
  onViewModeChange?: (mode: UploaderViewMode) => void;
}
