export interface UserModel {
  id?: number;
  image?: any;
  name?: string;
  nikName?: string;
  age?: number;
  email?: string;
  address?: string;
  dateBirth?: string | Date;
  gender?: string;
  position?: any;
  comments?: string[];
  units?: any[];
  tags?: any[];
  isAvailable?: boolean;
}

export const UserModelDefault: UserModel = {
  id: undefined,
  image: undefined,
  name: undefined,
  nikName: undefined,
  age: undefined,
  email: undefined,
  dateBirth: undefined,
  address: undefined,
  gender: undefined,
  position: undefined,
  comments: undefined,
  units: undefined,
  tags: undefined,
  isAvailable: undefined,
};
