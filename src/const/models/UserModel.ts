export interface UserModel {
  id?: number;
  image?: any;
  name?: string;
  nikName?: string;
  status?: string;
  age?: number;
  email?: string;
  address?: string;
  dateBirth?: string | Date;
  alertTime?: string | Date;
  rangeDate?: { from: Date | string; to: Date | string };
  multipleDate?: string | Date[];
  gender?: string;
  position?: any;
  comment?: string;
  units?: any[];
  tags?: any[];
  isAvailable?: boolean;
}

export const UserModelDefault: UserModel = {
  id: undefined,
  image: undefined,
  name: undefined,
  nikName: undefined,
  status: undefined,
  age: undefined,
  email: undefined,
  dateBirth: undefined,
  alertTime: undefined,
  rangeDate: undefined,
  multipleDate: undefined,
  address: undefined,
  gender: undefined,
  position: undefined,
  comment: undefined,
  units: undefined,
  tags: undefined,
  isAvailable: undefined,
};
