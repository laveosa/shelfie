import { BrandModel } from "@/const/models/BrandModel.ts";

export interface ICreateProductBrandCard {
  isLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  brand?: BrandModel;
  onAction?: (identifier: string, payload?: any) => void;
}
