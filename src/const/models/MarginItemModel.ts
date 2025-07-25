import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface MarginItemModel {
  marginItemId?: number;
  stockActionId?: number;
  variantId?: number;
  thumbnailUrl?: string;
  productId?: number;
  variantCode?: string;
  variantName?: string;
  traitOptions?: TraitOptionModel[];
  purchasePrice?: string;
  currentPrice?: number;
  taxTypeId?: number;
  marginPrice?: number;
  unitsAmount?: number;
  taxTypeChanged?: boolean;
  marginPriceChanged?: boolean;
  taxChangesNotApplied?: boolean;
  locked?: boolean;
  isChanged?: boolean;
  marginPriceApplied?: boolean;
}

export const MarginItemModelDefault: MarginItemModel = {
  marginItemId: null,
  stockActionId: null,
  variantId: null,
  thumbnailUrl: "",
  productId: null,
  variantCode: "",
  variantName: "",
  traitOptions: [],
  purchasePrice: "",
  currentPrice: null,
  taxTypeId: null,
  marginPrice: null,
  unitsAmount: null,
  taxTypeChanged: false,
  marginPriceChanged: false,
  taxChangesNotApplied: false,
  locked: false,
  isChanged: false,
  marginPriceApplied: false,
};
