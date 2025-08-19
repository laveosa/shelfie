export interface UserModel {
  id?: number;
  image?: any;
  name?: string;
  age?: number;
  email?: string;
  address?: string;
  gender?: string;
  position?: any;
  comments?: string;
  tags?: string[];
  isAvailable?: boolean;
}

export const UserModelDefault: UserModel = {
  id: undefined,
  image: undefined,
  name: undefined,
  age: undefined,
  email: undefined,
  address: undefined,
  gender: undefined,
  position: undefined,
  comments: undefined,
  tags: undefined,
  isAvailable: undefined,
};
