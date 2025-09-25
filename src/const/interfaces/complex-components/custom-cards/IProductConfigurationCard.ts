import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface IProductConfigurationCard {
  isLoading?: boolean;
  product: ProductModel;
  productId: string;
  brandsList?: BrandModel[];
  categoriesList?: CategoryModel[];
  countryCodesList?: CountryCodeModel[];
  onProductCodeCheck?: (data: any) => Promise<any>;
  productCode?: string;
  showSecondaryButton?: boolean;
  onPrimaryButtonClick?: (data: any) => void;
  onSecondaryButtonClick?: () => void;
  onAction?: (identifier?: string, payload?: any) => void;
}
