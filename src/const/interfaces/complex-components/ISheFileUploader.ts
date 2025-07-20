import { UploaderViewMode } from "@/components/complex/she-images-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts"; // Use existing model

export interface ISheFileUploader {
  isLoading?: boolean;
  contextName: string;
  contextId: number;
  fullWidth?: boolean;
  hideUploadButton?: boolean;
  viewMode?: UploaderViewMode; // "image" | "file"
  acceptedFileTypes?: Record<string, string[]>; // e.g., { "image/*": [".png", ".jpg"], "application/pdf": [".pdf"] }
  maxFiles?: number;
  onUpload: (uploadModel: UploadPhotoModel) => void; // Use existing model
  onViewModeChange?: (mode: UploaderViewMode) => void;
}
