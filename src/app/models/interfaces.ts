export interface IUser {
  name: string;
  firstName: string;
  age: number;
  job: string;
  salary: number;
  hobbies?: string[];
}

export interface IInfo {
  url: string;
  category: string;
  items: IInfoItem[];
}

export interface ISearch {
  url: string;
  category: string;
  id: string;
}

export interface IInfoItem {
  id: string;
  code: string;
}

export interface IHobby {
  name: string;
  hobbies: string[];
}
