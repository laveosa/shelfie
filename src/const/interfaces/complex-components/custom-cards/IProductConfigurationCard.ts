import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

export interface IProductConfigurationCard {
  isLoading?: boolean;
  product: ProductModel;
  brandsList?: BrandModel[];
  categoriesList?: CategoryModel[];
  showSecondaryButton?: boolean;
  onProductCodeCheck?: (data: any) => Promise<any>;
  onGenerateProductCode?: () => Promise<any>;
  onOpenCreateProductCategoryCard?: () => void;
  onOpenCreateProductBrandCard?: () => void;
  onPrimaryButtonClick?: (data: any) => void;
  onSecondaryButtonClick?: () => void;
}
