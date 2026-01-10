var e={url:"basicConcepts",category:"basicConcepts",items:[{id:"observableObserverSubscription",code:`// 1. We define an Observable
const observable = new Observable<number>((subscriber) => {
  console.log('Observable starts emitting values');

  // Emit some values
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  // Complete the emission of values
  subscriber.complete();
});

// 2. We define an Observer
const observer = {
  next: (value: number) => console.log('Value ->', value), // Handles the emitted values
  error: (err: any) => console.log('Error:', err), // Handles the error
  complete: () => console.log('Complete!'), // Handles the completion (No Error)
};

// 3. We create the subscription
const subscription = observable.subscribe(observer);

// 4. Here you can cancel the subscription if you wish.
subscription.unsubscribe();`},{id:"unsubscribe",code:`let subscription = new Subscription();
      
const createSubscription = () => {
  subscription = interval(1000).subscribe((n: number) => console.log(n));
};

fromEvent(document.getElementById('btn-click-subscribe')!, 'click').subscribe(() => {
  if (!subscription.closed) subscription.unsubscribe();
  createSubscription();
});
fromEvent(document.getElementById('btn-click-unsubscribe')!, 'click').subscribe(() =>
  subscription.unsubscribe(),
);`},{id:"unsubscribeSeveral",code:`let subscription = new Subscription();
      
subscription.add(
  interval(1000).subscribe((n: number) =>
    console.log('interval 1-> ' + n),
  ),
);

subscription.add(
  interval(500).subscribe((n: number) =>
    console.log('interval 2-> ' + n),
  ),
);

fromEvent(document.getElementById('btn-click-unsubscribe-all')!, 'click').subscribe(() =>
  subscription.unsubscribe(),
);`}]};var s={url:"operators/combination",category:"combination",items:[{id:"combineLatest",code:`const obs1$ = of(1, 2);
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
combineLatest([obs1$, obs2$, obs3$]).subscribe((data) =>
    console.log(data))`},{id:"concat",code:`const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
concat(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`},{id:"concatAll",code:`const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(
    map((obs) => obs), // We transform the values into observables
    concatAll(), // Concatenates the values of the emitted observables
  )
  .subscribe((data) => console.log(data))`},{id:"exhaust",code:`const obs1$ = of(1, 2);
const obs2$ = of('a', 'b').pipe(delay(3000));
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(exhaust())
  .subscribe((data) => console.log(data))`},{id:"forkJoin",code:`const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
forkJoin(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`},{id:"merge",code:`const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
merge(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`},{id:"mergeAll",code:`const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(
    map((obs) => obs), // We transform the values into observables
    mergeAll(), // Concatenates the values of the emitted observables
  )
  .subscribe((data) => console.log(data))`},{id:"race",code:`const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
race(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`},{id:"startWith",code:`const obs1$ = of(1, 2).pipe(delay(2000));
obs1$.pipe(startWith(0)).subscribe((data:number) =>
    console.log(data))`},{id:"switchAll",code:`const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(
    map((obs) => obs), // We transform the values into observables
    switchAll(), // Concatenates the values of the emitted observables
  )
  .subscribe((data) => console.log(data))`},{id:"withLatestFrom",code:`const obs1$ = of(1, 2);
const obs2$ = of('a', 'b');
const obsAll$ = of(obs1$, obs2$, obs3$);
obs1$
  .pipe(
    withLatestFrom(obs2$),
    map(([obs1, obs2]) => obs1 + ' - ' + obs2),
  )
  .subscribe((data) => console.log(data))`}]};var r={url:"operators/conditional",category:"conditional",items:[{id:"defaultIfEmpty",code:`const obs$ = of();
obs$
  .pipe(defaultIfEmpty('No Data'))
  .subscribe((data) => console.log(data))`},{id:"every",code:`const obs$ = of(5, 10, 20, 4);
obs$
  .pipe(every((n: number) => n >= 5))
  .subscribe((data) => console.log(data))`},{id:"find",code:`const obs$ = of(5, 10, 20, 4);
obs$
  .pipe(find((n: number) => n >= 5))
  .subscribe((data: number | undefined) => console.log(data))`},{id:"findIndex",code:`const obs$ = of(5, 10, 20, 4);
obs$
  .pipe(findIndex((n: number) => n >= 5))
  .subscribe((data: number | undefined) => console.log(data))`},{id:"isEmpty",code:`const obs$ = of();
obs$
  .pipe(isEmpty())
  .subscribe((data:boolean) => console.log(data))`},{id:"sequenceEqual",code:`const obs1$ = of(5, 10, 20, 4);
const obs2$ = of(5, 10, 20, 3);
obs1$
  .pipe(sequenceEqual(obs2$))
  .subscribe((data:boolean) => console.log(data))`}]};var i={url:"operators/creation",category:"creation",items:[{id:"ajax",code:`const obs$ = ajax('https://jsonplaceholder.typicode.com/posts');
obs$.subscribe({
  next: (response) => console.log('response-> ' + response),
  error: (err) => console.log('error-> ' + err),
  complete: () => console.log('complete ****'),
});
`},{id:"defer",code:`const obs$ = defer(() => {
const currentTime = new Date().toLocaleTimeString();
  return of('Hora actual: ' + currentTime);
});
obs$.subscribe((data) => console.log(data));
setTimeout(() => {
  obs$.subscribe((data) => console.log(data)),
}, 2000);
`},{id:"from",code:`const obs1$ = from('hello');
const obs2$ = from([1, 2, 3]);
obs1$.subscribe((data) => console.log(data));
obs2$.subscribe((data) => console.log(data));`},{id:"fromEvent",code:`const obs$ = fromEvent<KeyboardEvent>(document, 'keydown');
obs$.subscribe((event) => console.log('The key pressed is ' + event.key))`},{id:"generate",code:`const obs$ = generate(
  1, // Initial state
  (x) => x <= 64, // Condition to continue
  (x) => x * 2, // How to update the state (double the value)
);
obs$.subscribe((data) => console.log(data));
`},{id:"iif",code:`const condition = 5 > 10;
const obs$ = iif(
  () => condition, // Condition (if true, it will emit the first observable)
  of('Condition is true'), // First observable
  of('Condition is false'), // Second observable
);
obs$.subscribe((data) => console.log(data));
`},{id:"interval",code:`const obs$ = interval(2000); // Emits an incremental number every 2 seconds.
obs$.subscribe((data:number) => console.log(data));
`},{id:"of",code:`const obs1$ = from('hello');
const obs2$ = from([1, 2, 3]);
obs1$.subscribe((data) => console.log(data));
obs2$.subscribe((data) => console.log(data));`},{id:"range",code:`const obs$ = range(1,5);
obs$.subscribe((data:number) => console.log(data));
`},{id:"throwError",code:`const error$ = throwError({ error: { status: 500, message: 'Server error' } });
error$.subscribe({
  next: () => {},
  error: (e: HttpErrorResponse) => console.log(e),
})
`},{id:"timer",code:`const obs$ = timer(2000); // Emits after 2 seconds.
obs$.subscribe(() => console.log('Hello world!!!'));
`}]};var a={url:"operators/error",category:"error",items:[{id:"catchError",code:`const obs$ = throwError(new Error('server error')).pipe(
  timeout(2000),
  catchError(() => of([])),
);
obs$.subscribe((resp) => console.log(resp));`},{id:"retry",code:`const obs$ = ajax('https://fake.url.test.retry').pipe(retry(1));
obs$.subscribe({
  error: (err: HttpErrorResponse) => console.log((err.message)),
}),`}]};var l={url:"operators/filtering",category:"filtering",items:[{id:"audit",code:`const click$ = fromEvent(document.getElementById('btn-click-audit')!, 'click');
const obs$ = click$.pipe(audit(() => interval(2000)));
obs$.subscribe(() => console.log('audit', 'Click made!!'));`},{id:"auditTime",code:`const click$ = fromEvent(document.getElementById('btn-click-audit-time')!, 'click');
const obs$ = click$.pipe(auditTime(2000));
obs$.subscribe(() => console.log('audit', 'Click made!!'));`},{id:"debounce",code:`const keys$ = fromEvent<KeyboardEvent>(document, 'keydown');
const obs$ = keys$.pipe(debounce(() => interval(1000)));
obs$.subscribe((event) => console.log('The last key pressed is ' + event.key));`},{id:"debounceTime",code:`const keys$ = fromEvent<KeyboardEvent>(document, 'keydown');
const obs$ = keys$.pipe(debounceTime(1000));
obs$.subscribe((event) => console.log('The last key pressed is ' + event.key));`},{id:"distinct",code:`const numbers$ = of(1, 2, 2, 3, 2, 3, 3, 4, 5, 4, 6, 7, 6, 7, 8);
const obs$ = numbers$.pipe(distinct());
obs$.subscribe((number: number) => console.log(number));`},{id:"distinctUntilChanged",code:`const numbers$ = of(1, 2, 2, 3, 2, 3, 3, 4, 5, 4, 6, 7, 6, 7, 8);
const obs$ = numbers$.pipe(distinctUntilChanged());
obs$.subscribe((number: number) => console.log(number));`},{id:"distinctUntilKeyChanged",code:`const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(distinctUntilKeyChanged('name'));
users$.subscribe((user) => console.log(user));`},{id:"elementAt",code:`const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(elementAt(3));
users$.subscribe((user) => console.log(user));`},{id:"filter",code:`const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(
    distinctUntilKeyChanged('name'),
    filter((user) => user.age > 3),
);
users$.subscribe((user) => console.log(user));
`},{id:"first",code:`const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(
    first((user) => user.age > 3),
);
users$.subscribe((user) => console.log(user));
`},{id:"ignoreElements",code:`const users$ = of(1).pipe(ignoreElements());
users$.subscribe({
  next: (e: number) => console.log('success'), // It never runs.
  error: () => console.log('error'), // It passes errors
  complete: () => console.log('complete'), // It passes the completion signal
})
`},{id:"last",code:`const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(last((user) => user.age > 5, 'No user was found'));
);
users$.subscribe((user) => console.log(user));
`},{id:"sample",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(sample(interval(5000)));
obs$.subscribe((n: number) => console.log(n));
`},{id:"sampleTime",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(sampleTime(3000));
obs$.subscribe((n: number) => console.log(n));
`},{id:"single",code:`const numbers$ = of(1, 2, 3, 4, 5);
const obs1$ = numbers$.pipe(single((n: number) => n >= 5));
const obs2$ = numbers$.pipe(single((n: number) => n >= 4)); // It will throw an error when more than one result is found.
obs1$.subscribe((n: number) => console.log(n));
obs2$.subscribe({
  error: (e: Error) => console.log(e.message))
});
`},{id:"skip",code:`const numbers$ = of(1, 2, 3, 4);
const obs$ = numbers$.pipe(skip(2));
obs$.subscribe((number: number) => console.log(number));`},{id:"skipLast",code:`const numbers$ = of(1, 2, 3, 4);
const obs$ = numbers$.pipe(skipLast(2));
obs$.subscribe((number: number) => console.log(number));`},{id:"skipUntil",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(skipUntil(interval(3000)));
obs$.subscribe((number: number) => console.log(number));`},{id:"skipWhile",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(skipWhile((n:number)=> n < 5));
obs$.subscribe((number: number) => console.log(number));`},{id:"take",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(take(5));
obs$.subscribe((number: number) => console.log(number));`},{id:"takeLast",code:`const numbers$ = of(1, 2, 3, 4);
const obs$ = numbers$.pipe(takeLast(2));
obs$.subscribe((number: number) => console.log(number));`},{id:"takeUntil",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(takeUntil(interval(3000)));
obs$.subscribe((number: number) => console.log(number));`},{id:"takeWhile",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(takeWhile((n:number)=> n < 5));
obs$.subscribe((number: number) => console.log(number));`},{id:"throttle",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(throttle(() => interval(5000)));
obs$.subscribe((number: number) => console.log(number));`},{id:"throttleTime",code:`const interval$ = interval(1000);
const obs$ = interval$.pipe(throttleTime(5000));
obs$.subscribe((number: number) => console.log(number));`}]};var d={url:"operators/mathematical",category:"mathematical",items:[{id:"count",code:`const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(count((n: number) => n > 3))
  .subscribe((data: number) => console.log(data))`},{id:"max",code:`const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(max())
  .subscribe((data: number) => console.log(data))`},{id:"min",code:`const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(min())
  .subscribe((data: number) => console.log(data))`},{id:"reduce",code:`const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(reduce((acc, value) => acc + value, 0))
  .subscribe((data: number) => console.log(data))`}]};var m={url:"operators/multicasting",category:"multicasting",items:[{id:"connect",code:`const click$ = fromEvent(document.getElementById('btn-click-connect')!, 'click').pipe(take(1));
const source$: ConnectableObservable<number> = interval(1000).pipe(
  take(5),
  publish(),
) as ConnectableObservable<number>;

click$.subscribe(() => {
    source$.connect();
});

source$.subscribe((data: number) => console.log(data));
`},{id:"share",code:`const interval$ = interval(1000).pipe(take(10), share());
interval$.subscribe((n: number) =>
  console.log('First subscriber ' + n),
);

setTimeout(() => {  
  interval$.subscribe((n: number) =>
    console.log('Second subscriber ' + n),
  );
}, 5000);

`},{id:"shareReplay",code:`const interval$ = interval(1000).pipe(take(10), shareReplay(3)); // we store the last 3 emissions
interval$.subscribe((n: number) =>
  console.log('First subscriber ' + n),
);

setTimeout(() => {  
  interval$.subscribe((n: number) =>
    console.log('Second subscriber ' + n),
  );
}, 5000);

`}]};var g={url:"realLife/examples",category:"realLife",items:[{id:"filterUsersMap",code:`this.userService
.getUsers()
.pipe(map((users: IUser[]) => users.filter((u: IUser) => u.salary >= 30000 && u.age > 39)))
.subscribe((users: IUser[]) => console.log(users))`},{id:"filterUsersMergeMapFilter",code:`this.userService
.getUsers()
.pipe(
  mergeMap((users: IUser[]) => users), // Emit individual users
  filter((u: IUser) => u.salary >= 30000 && u.age > 39),
  toArray(),
)
.subscribe((users: IUser[]) =>
  console.log(users))`},{id:"mergeUsersHobbiesforkJoinConcatMap",code:`// users = [{"name": "Jhon","firstName": "Trump","age": 40,"job": "Front end developer","salary": 30000},...]
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
  .subscribe((usersWithHobbies) => console.log(usersWithHobbies))`},{id:"filterAndmergeUsersHobbies",code:`// users = [{"name": "Jhon","firstName": "Trump","age": 40,"job": "Front end developer","salary": 30000},...]
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
  .subscribe((data) => console.log(data))`},{id:"searchApi",code:`const searh = (namePokemon: string) => {
const url = 'https://pokeapi.co/api/v2/pokemon/' + namePokemon.toLocaleLowerCase();
  this.http.get(url).subscribe({
    next: (data: any) => console.log(data.forms),
    error: (e: HttpErrorResponse) => console.log('Pok\xE9mon not found'),
  })
};
      
const inputText = document.getElementById('search__input') as HTMLInputElement;

fromEvent(inputText!, 'input')
  .pipe(
    debounceTime(1000),
    filter(() => inputText.value.length >= 2),
  )
  .subscribe(() => searh(inputText.value))`}]};var v={url:"subjects",category:"subjects",items:[{id:"behaviorSubject",code:`const user$ = new BehaviorSubject<{ name: string; age: number }>({
  name: 'Jhon',
  age: 40,
});
console.log('getValue() -> ' + user$.getValue());
      
const click$ = fromEvent(document.getElementById('btn-click-behavior')!, 'click');

click$.subscribe(() => user$.next({ ...user$.getValue(), age: user$.getValue().age + 1 }));
user$.subscribe((user: { name: string; age: number }) =>
  console.log('subscribe -> ' + user));`},{id:"replaySubject",code:`const replay$ = new ReplaySubject<number>(2);
const interval$ = interval(1000).pipe(take(5));
interval$.subscribe((n: number) => replay$.next(n));
setTimeout(() => {
  replay$.subscribe((n: number) =>
    console.log(n)
  )
}, 5000);`},{id:"subject",code:`let user: { name: string; age: number } | null = null;
const user$ = new Subject<{ name: string; age: number }>();

const click$ = fromEvent(document.getElementById('btn-click-subject')!, 'click');
click$.subscribe(() => {
  user = !user ? { name: 'Jhon', age: 40 } : { ...user, age: user!.age + 1 };
  user$.next(user);
});

user$.subscribe((user: { name: string; age: number }) =>
  console.log('subscribe -> ' + user));`}]};var y={url:"operators/transformation",category:"transformation",items:[{id:"buffer",code:`const click$ = fromEvent(document.getElementById('btn-click-buffer')!,'click');
const triger$ = interval(3000);
click$.pipe(buffer(triger$))
      .subscribe((clicks: Event[]) => console.log(clicks.length));`},{id:"bufferCount",code:`const click$ = fromEvent(document.getElementById('btn-click-buffer-count')!,'click');
click$.pipe(bufferCount(5))
      .subscribe((clicks: Event[]) => console.log('5 clicks'));`},{id:"bufferTime",code:`const interval$ = interval(1000);
interval$.pipe(bufferTime(3000))
         .subscribe((n: number[]) => console.log(n));`},{id:"bufferToogle",code:`const start$ = fromEvent(document.getElementById('btn-click-buffer-toogle-start')!,'click');
const stop$ = () =>
    fromEvent(document.getElementById('btn-click-buffer-toogle-stop')!,'click');
const interval$ = interval(1000);
interval$.pipe(bufferToggle(start$, stop$))
         .subscribe((n: number[]) => console.log(n));`},{id:"bufferWhen",code:`const interval$ = interval(1000);
const click$ = fromEvent(document.getElementById('btn-click-buffer-when')!,'click');  
interval$.pipe(bufferWhen(() => click$))
         .subscribe((n: number[]) => console.log(n));`},{id:"concatMap",code:`fromEvent(document.getElementById('btn-start-cc-map')!, 'click')
    .pipe(
      concatMap((e) =>
        interval(1000).pipe(map((n: number) => e.target.id + ' ' + n))
      )
    )
    .subscribe((data: string) => console.log(data))`},{id:"exhaustMap",code:`fromEvent(document.getElementById('btn-start-exhaust-map')!, 'click')
    .pipe(
      delay(5000),
      exhaustMap(() => this.userService.getUsers())
    )
    .subscribe((data: IUser[]) => console.log(data));`},{id:"expand",code:`of(1)
    .pipe(
      expand((x) => of(x + 10)),
      take(5)
    )
    .subscribe((x: number) => this.addConsole('expand', x.toString()));`},{id:"groupBy",code:`const animals$ = from([
  { name: 'Rufy', species: 'cat' },
  { name: 'Benito', species: 'dog' },
  { name: 'Mini', species: 'cat' },
  { name: 'Pedro', species: 'dog' },
]);
      
const species$ = animals$.pipe(
  groupBy(({ species }) => species),
  mergeMap((species) => species.pipe(toArray()))
);
species$.subscribe((species) => console.log(species));`},{id:"map",code:`public getUsers(): Observable<IUser[]> {
    const url = 'assets/data/data2.json';
    return this.http.get<IUser[]>(url);
}

this.userService.getUsers()
    .pipe(
      map((e: IUser[]) =>
      e.map((u: IUser) => ({ ...u, name: u.name + ' ****--****' })))
    )
    .subscribe((data: IUser[]) => console.log(data));`},{id:"mapTo",code:`from(['orange', 'lemon', 'melon'])
    .pipe(mapTo('strawberry'))
    .subscribe((data: string) => console.log(data));`},{id:"mergeMap",code:`from(['a', 'b', 'c'])
    .pipe(
      mergeMap((e: string) =>
        range(1, 2).pipe(map((n: number) => e + ' + ' + n + ' = ?'))
      )
    )
    .subscribe((data: string) => console.log(data));`},{id:"mergeMapTo",code:`from(['a', 'b', 'c'])
    .pipe(
      mergeMapTo(range(1, 2).pipe(map((n: number) => 'the same output' + ' + ' + n + ' = ?')))
    )
    .subscribe((data: string) => console.log(data));`},{id:"mergeScan",code:`of(1, 10, 20)
    .pipe(
      mergeScan((acc: number, value: number) => {
        return of(acc + value);
      }, 0), // The accumulator starts at 0.
    )
    .subscribe((result: number) => console.log(result))`},{id:"pairwise",code:`of(1, 10, 20)
    .pipe(pairwise())
    .subscribe((result: number[]) => console.log(result))`},{id:"partition",code:`const animals$ = from([
  { name: 'Rufy', species: 'cat' },
  { name: 'Benito', species: 'dog' },
  { name: 'Mini', species: 'cat' },
  { name: 'Pedro', species: 'dog' },
  { name: 'Marc', species: 'monkey' },
]);
const [cats$] = partition(animals$, ({ species }) => species === 'cat');
cats$.subscribe((cats) => console.log(cats))`},{id:"pluck",code:`const animals$ = from([
  { name: 'Rufy', species: 'cat' },
  { name: 'Benito', species: 'dog' },
  { name: 'Mini', species: 'cat' },
  { name: 'Pedro', species: 'dog' },
]);    
animals$
  .pipe(pluck('name'))
  .subscribe((name: string) => console.log(name))`},{id:"scan",code:`of(1, 10, 20)
  .pipe(scan((acc: number, value: number) => acc + value))
  .subscribe((result: number) => console.log(result))`},{id:"switchMap",code:`fromEvent(document.getElementById('btn-start-sw-map')!, 'click')
    .pipe(
      switchMap((e) =>
        interval(1000).pipe(map((n: number) => e.target.id + ' ' + n))
      )
    )
    .subscribe((data: string) => console.log(data))`},{id:"window",code:`const source$ = interval(1000);
const closingNotifier$ = interval(3000);
source$
    .pipe(
      window(closingNotifier$),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`},{id:"windowCount",code:`const source$ = of(1, 2, 3, 4, 5, 6);
source$
    .pipe(
      windowCount(3, 2), // Windows of 3 elements, starting every 2 values
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`},{id:"windowTime",code:`const source$ = interval(1000);
source$
    .pipe(
      windowTime(3000),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`},{id:"windowToogle",code:`const source$ = interval(1000);
const openings$ = interval(5000);
const closings = () => interval(3000);
this.subscription.add(
  source$
    .pipe(
      windowToggle(openings$, closings),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`},{id:"windowWhen",code:`const source$ = interval(1000);
source$
    .pipe(
      windowWhen(() => interval(3000)),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`}]};var w={url:"operators/utility",category:"utility",items:[{id:"delay",code:`const obs$ = of('hello world!!!').pipe(delay(2000));
obs$.subscribe((resp:string) => console.log(resp));`},{id:"delayWhen",code:`const obs$ = of('error', 'success').pipe(
delayWhen((resp: string) => timer(resp === 'error' ? 2000 : 0)));
obs$.subscribe((resp:string) => console.log(resp));`},{id:"dematerialize",code:`const obs$ = of(1, 2, 3).pipe(materialize(), dematerialize());
obs$.subscribe((n:number) => console.log(n));`},{id:"finalize",code:`const obs$ = of(1, 2, 3).pipe(finalize(() => console.log('finalize'));
obs$.subscribe((n:number) => console.log(n));`},{id:"materialize",code:`const obs$ = of(1, 2, 3).pipe(materialize());
obs$.subscribe((resp) => console.log(resp));`},{id:"repeat",code:`const obs$ = of(1, 2, 3).pipe(repeat(2));
obs$.subscribe((n:number) => console.log(n));`},{id:"tap",code:`const obs$ = of(1, 2, 3).pipe(tap((n:number)=> console.log('tap->' +  n)));
obs$.subscribe((n:number) => console.log(n));`},{id:"timeInterval",code:`const obs$ = interval(1000).pipe(timeInterval());
obs$.subscribe((resp) => console.log(resp));`},{id:"timeout",code:`const obs$ = timer(3000).pipe(timeout(2000));
obs$.subscribe({
  error: (e: Error) => console.log(e.message),
}),`},{id:"timestamp",code:`const obs$ = interval(1000).pipe(timestamp());
obs$.subscribe((resp) => console.log(resp));`},{id:"toArray",code:`const obs$ = interval(1000).pipe(take(10), toArray());
obs$.subscribe((numbers: number[]) => console.log(numbers));`}]};export{e as a,s as b,r as c,i as d,a as e,l as f,d as g,m as h,g as i,v as j,y as k,w as l};
