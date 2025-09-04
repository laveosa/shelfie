import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface ICreateProductCategoryCard {
  isLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  category?: CategoryModel;
  onAction?: (identifier: string, payload?: any) => void;
}
