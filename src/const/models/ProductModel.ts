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
  productCategoryId?: number;
  brand?: BrandModel;
  brandId?: number;
  barcode?: any;
  status?: string;
  salePrice?: number;
  variantsCount?: number;
  stockAmount?: number;
  countryId?: number;
  isActive?: boolean;
}

export const ProductDefaultModel: ProductModel = {
  productId: null,
  productAppId: undefined,
  image: undefined,
  productCode: undefined,
  productName: undefined,
  productCategory: undefined,
  productCategoryId: undefined,
  brand: undefined,
  brandId: undefined,
  barcode: undefined,
  status: undefined,
  salePrice: undefined,
  variantsCount: undefined,
  stockAmount: undefined,
  countryId: undefined,
  isActive: false,
};
