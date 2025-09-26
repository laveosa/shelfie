import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export interface ICreateCompanyForm<T> {
  isLoading?: boolean;
  isGridLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  className?: string;
  data?: CompanyModel;
  countryCodes?: CountryCodeModel[];
  onSubmit?: (data: T) => void;
  onImageUpload?: (data: T) => void;
  onCancel?: () => void;
  photos?: any[];
  onDeletePhoto?: (identifier: string, payload?: any) => void;
  onDndPhoto?: (data: any) => void;
}
