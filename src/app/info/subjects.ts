import { IInfo } from '../models/interfaces';

export const subjects: IInfo = {
  url: 'subjects',
  category: 'subjects',
  items: [
    {
      id: 'behaviorSubject',
      code: `const user$: BehaviorSubject<{ name: string; age: number }> = new BehaviorSubject({
  name: 'Jhon',
  age: 40,
});
console.log('getValue() -> ' + user$.getValue());
      
const click$ = fromEvent(document.getElementById('btn-click-behavior')!, 'click');

click$.subscribe(() => user$.next({ ...user$.getValue(), age: user$.getValue().age + 1 }));
user$.subscribe((user: { name: string; age: number }) =>
  console.log('subscribe -> ' + user));`,
    },
    {
      id: 'replaySubject',
      code: `const replay$ = new ReplaySubject<number>(2);
const interval$ = interval(1000).pipe(take(5));
interval$.subscribe((n: number) => replay$.next(n));
setTimeout(() => {
  replay$.subscribe((n: number) =>
    console.log(n)
  )
}, 5000);`,
    },
    {
      id: 'subject',
      code: `let user: { name: string; age: number } | null = null;
const user$: Subject<{ name: string; age: number }> = new Subject();

const click$ = fromEvent(document.getElementById('btn-click-subject')!, 'click');
click$.subscribe(() => {
  user = !user ? { name: 'Jhon', age: 40 } : { ...user, age: user!.age + 1 };
  user$.next(user);
});

user$.subscribe((user: { name: string; age: number }) =>
  console.log('subscribe -> ' + user));`,
    },
  ],
};
