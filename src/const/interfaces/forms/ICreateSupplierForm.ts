import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICreateSupplierForm<T> {
  isLoading?: boolean;
  isGridLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  className?: string;
  data?: SupplierModel;
  countryList?: CountryCodeModel[];
  onSubmit?: (data: T) => void;
  onImageUpload?: (data: T) => void;
  onCancel?: () => void;
  photos?: any[];
  onDeletePhoto?: (identifier: string, payload?: any) => void;
  onDndPhoto?: (data: any) => void;
}
