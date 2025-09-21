import { UploaderViewMode } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts"; // Use existing model

export interface ISheFileUploader {
  isLoading?: boolean;
  className?: string;
  contextName?: string;
  contextId?: number;
  fullWidth?: boolean;
  hideUploadButton?: boolean;
  viewMode?: UploaderViewMode;
  acceptedFileTypes?: Record<string, string[]>;
  maxFiles?: number;
  previewImage?: any;
  uploadAreaText?: string;
  uploadAreaSubtext?: string;
  onUpload?: (uploadModel: UploadPhotoModel) => void;
  onViewModeChange?: (mode: UploaderViewMode) => void;
}
