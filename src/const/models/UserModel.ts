export interface UserModel {
  id?: number;
  name?: string;
  email?: string;
  gender?: string;
}

export const UserModelDefault: UserModel = {
  id: 0,
  name: "",
  email: "",
  gender: "",
};
