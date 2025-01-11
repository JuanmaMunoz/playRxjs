import { IInfo } from '../models/interfaces';

export const realLife: IInfo = {
  url: 'realLife/examples',
  category: 'realLife',
  items: [
    {
      id: 'filterUsersMap',
      code: `this.userService
.getUsers()
.pipe(map((users: IUser[]) => users.filter((u: IUser) => u.salary >= 30000 && u.age > 39)))
.subscribe((users: IUser[]) => console.log(users))`,
    },
    {
      id: 'filterUsersMergeMapFilter',
      code: `this.userService
.getUsers()
.pipe(
  mergeMap((users: IUser[]) => users), // Emit individual users
  filter((u: IUser) => u.salary >= 30000 && u.age > 39),
  toArray(),
)
.subscribe((users: IUser[]) =>
  console.log(users))`,
    },
  ],
};
