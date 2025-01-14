import { ImageModel } from "@/const/models/ImageModel.ts";

export interface ProductsModel {
  id?: any;
  image?: ImageModel;
  code?: number;
  productName?: string;
  category?: string;
  brand?: string;
  barcode?: number;
  status?: string;
  salePrice?: number;
  variantCount?: number;
  stock?: number;
  active?: boolean;
}
