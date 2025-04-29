import { VariantModel } from "@/const/models/VariantModel.ts";

export interface ImageModel {
  adaptedUrl?: string;
  height?: number;
  isActive?: boolean;
  photoId?: number;
  sortOrder?: number;
  thumbnailUrl?: string;
  width?: number;
  variants?: VariantModel[];
}
