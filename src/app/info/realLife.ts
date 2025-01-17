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
    {
      id: 'mergeUsersHobbiesforkJoinConcatMap',
      code: `// users = [{"name": "Jhon","firstName": "Trump","age": 40,"job": "Front end developer","salary": 30000},...]
// hobbies = [{"name": "Jhon","hobbies": ["fishing, music, sport"]},...]
const users$ = this.userService.getUsers().pipe(delay(2000));
const hobbies$ = this.userService.gethobbies();
forkJoin(users$, hobbies$)
  .pipe(
    concatMap(([u, h]: [IUser[], IHobby[]]) => {
      return of({ users: u, hobbies: h }).pipe(
        map((data: { users: IUser[]; hobbies: IHobby[] }) =>
          data.users.map((user: IUser) => ({
            ...user,
            hobbies: data.hobbies.find((hobby: IHobby) => hobby.name === user.name)?.hobbies,
          })),
        ),
      );
    }),
  )
  .subscribe((usersWithHobbies) => console.log(usersWithHobbies))`,
    },
    {
      id: 'filterAndmergeUsersHobbies',
      code: `// users = [{"name": "Jhon","firstName": "Trump","age": 40,"job": "Front end developer","salary": 30000},...]
// hobbies = [{"name": "Jhon","hobbies": ["fishing, music, sport"]},...]
const user$ = this.userService.getUsers().pipe(
  map((users: IUser[]) => users.find((u: IUser) => u.name === 'Jhon')),
  delay(2000),
);
const hobbies$ = this.userService.gethobbies();
forkJoin(user$, hobbies$)
  .pipe(
    map(([u, h]: [IUser | undefined, IHobby[]]) => ({
      ...u,
      hobbies: h.find((hobby: IHobby) => hobby.name === u?.name),
    })),
  )
  .subscribe((data) => console.log(data))`,
    },
    {
      id: 'searchApi',
      code: `const searh = (namePokemon: string) => {
const url = 'https://pokeapi.co/api/v2/pokemon/' + namePokemon;
  this.http.get(url).subscribe({
    next: (data: any) => console.log(data.forms),
    error: (e: HttpErrorResponse) => console.log('Pokémon not found'),
  })
};
      
const inputText = document.getElementById('search__input') as HTMLInputElement;

fromEvent(inputText!, 'input')
  .pipe(
    debounceTime(1000),
    filter(() => inputText.value.length >= 2),
  )
  .subscribe(() => searh(inputText.value))`,
    },
  ],
};
