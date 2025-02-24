import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface IProductConfigurationCard {
  productId: number;
  brandsList?: BrandModel[];
  categoriesList?: CategoryModel[];
  onProductCodeChange?: (data: any) => Promise<any>;
  onGenerateProductCode?: () => Promise<any>;
  onOpenCreateProductCategoryCard?: () => void;
  onOpenCreateProductBrandCard?: () => void;
  onPrimaryButtonClick?: (data: any, resetForm?: any) => void;
  onSecondaryButtonClick?: () => void;
  resetForm?: (reset: any) => void;
}
