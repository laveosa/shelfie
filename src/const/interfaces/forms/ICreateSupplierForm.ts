import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICreateSupplierForm {
  className?: string;
  isLoading?: boolean;
  isGridLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  data?: SupplierModel;
  countryList?: CountryCodeModel[];
  photos?: any[];
  onImageUpload?: (data: SupplierModel) => void;
  onDndPhoto?: (data: any) => void;
  onDeletePhoto?: (identifier: string, payload?: any) => void;
  onSubmit?: (data: SupplierModel) => void;
  onCancel?: () => void;
}
