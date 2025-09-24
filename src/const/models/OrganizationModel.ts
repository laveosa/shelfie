export interface OrganizationModel {
  key?: string;
  id?: number;
  name?: string;
  shortName?: string;
  thumbnail?: string;
  subscription?: {
    status: "Active";
  };
}
