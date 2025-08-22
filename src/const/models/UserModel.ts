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

/*export const UserModelDefault: UserModel = {
  id: undefined,
  image: undefined,
  name: "Tom Hanks",
  age: 32,
  email: "test@yahoo.com",
  address: "Levetano 5/23",
  gender: "male",
  position: undefined,
  comments: undefined,
  tags: undefined,
  isAvailable: undefined,
};*/

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
