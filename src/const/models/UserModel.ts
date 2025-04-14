export interface UserModel {
  id?: number;
  name?: string;
  age?: number;
  email?: string;
  address?: string;
  gender?: string;
  position?: any;
  comments?: string;
  isAvailable?: boolean;
}

export const UserModelDefault: UserModel = {
  id: 0,
  name: "",
  age: 0,
  email: "",
  address: "",
  gender: "",
  position: null,
  comments: "",
};
