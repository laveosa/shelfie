export interface UserOrganizationModel {
  id?: number;
  key?: string;
  name?: string;
  thumbnail?: string;
  shortName?: string;
  subscription?: {
    status: string;
  };
}
