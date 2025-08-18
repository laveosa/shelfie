import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface OrderItemModel {
  id: number;
  stockActionId: number;
  orderId: number;
  productId: number;
  variantId: number;
  variantName: string;
  variantCode: string;
  traitOptions: TraitOptionModel[];
  photo: {
    originalName: string;
    assetId: number;
    photoId: number;
    thumbnailUrl: string;
    adaptedUrl: string;
    width: number;
    height: number;
    sortOrder: number;
    isActive: true;
  };
  QuantityOrdered: number;
  QuantityToShip: number;
  QuantityShipped: number;
  QuantityPacked: number;
}
