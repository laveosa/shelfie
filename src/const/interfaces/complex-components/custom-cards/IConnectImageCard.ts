import { GridModel } from "@/const/models/GridModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export interface IConnectImageCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variants?: VariantModel[];
  data?: GridModel;
  selectedPhoto?: ImageModel;
  productCounter?: ProductCountersModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
