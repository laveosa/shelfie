import { ImageModel } from "@/const/models/ImageModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";

export interface ProductModel {
  productId?: number;
  productAppId?: string;
  image?: ImageModel;
  productCode?: string;
  productName?: string;
  productCategory?: CategoryModel;
  categoryId?: number;
  brand?: BrandModel;
  barcode?: number;
  status?: string;
  salePrice?: number;
  variantsCount?: number;
  stockAmount?: number;
  isActive?: boolean;
}
