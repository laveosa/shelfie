import { ImageModel } from "@/const/models/ImageModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export interface IConnectImageCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variants?: any[];
  selectedPhoto?: ImageModel;
  productCounter?: ProductCountersModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
