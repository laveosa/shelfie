import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface ICreateSupplierForm {
  className?: string;
  isLoading?: boolean;
  isGridLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  data?: SupplierModel;
  countryList?: ISheSelectItem<number>[];
  photos?: any[];
  onImageUpload?: (data: SupplierModel) => void;
  onDndPhoto?: (data: any) => void;
  onDeletePhoto?: (identifier: string, payload?: any) => void;
  onSubmit?: (data: SupplierModel) => void;
  onCancel?: () => void;
}
