export interface CompanyModel {
  id?: number;
  title?: string;
  description?: string;
  isActive?: boolean;
  image?: string;
  companyId: number;
  appId: string;
  companyName: string;
  isDeleted: boolean;
  locationId: number;
  thumbnailUrl: string;
  address: string;
}
