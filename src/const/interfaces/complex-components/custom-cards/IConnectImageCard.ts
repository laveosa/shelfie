import { GridModel } from "@/const/models/GridModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

export interface IConnectImageCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variants?: VariantModel[];
  data?: GridModel;
  selectedPhoto?: ImageModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
