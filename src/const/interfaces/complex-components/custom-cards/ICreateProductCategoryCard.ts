import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface ICreateProductCategoryCard {
  isLoading?: boolean;
  category?: CategoryModel;
  onAction?: (identifier: string, payload?: any) => void;
}
