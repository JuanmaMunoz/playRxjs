export interface IUser {
  name: string;
  firstName: string;
  age: number;
  job: string;
  salary: number;
  hobbies?: string[];
}

export interface IInfo {
  id: string;
  title: string;
  description: string;
  code: string;
  output: string;
}

export interface IHobby {
  name: string;
  hobbies: string[];
}
