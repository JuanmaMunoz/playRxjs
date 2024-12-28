import { IInfo } from '../models/interfaces';

export const filterings: IInfo = {
  url: 'operators/filtering',
  category: 'filtering',
  items: [
    {
      id: 'audit',
      code: `const click$ = fromEvent(document.getElementById('btn-click-audit')!, 'click');
const obs$ = click$.pipe(audit(() => interval(2000)));
obs$.subscribe(() => console.log('audit', 'Click made!!'));`,
    },
    {
      id: 'auditTime',
      code: `const click$ = fromEvent(document.getElementById('btn-click-audit-time')!, 'click');
const obs$ = click$.pipe(auditTime(2000));
obs$.subscribe(() => console.log('audit', 'Click made!!'));`,
    },
    {
      id: 'debounce',
      code: `const keys$ = fromEvent<KeyboardEvent>(document, 'keydown');
const obs$ = keys$.pipe(debounce(() => interval(1000)));
obs$.subscribe((event) => console.log('The last key pressed is ' + event.key));`,
    },
    {
      id: 'debounceTime',
      code: `const keys$ = fromEvent<KeyboardEvent>(document, 'keydown');
const obs$ = keys$.pipe(debounceTime(1000));
obs$.subscribe((event) => console.log('The last key pressed is ' + event.key));`,
    },
    {
      id: 'distinct',
      code: `const numbers$ = of(1, 2, 2, 3, 2, 3, 3, 4, 5, 4, 6, 7, 6, 7, 8);
const obs$ = numbers$.pipe(distinct());
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'distinctUntilChanged',
      code: `const numbers$ = of(1, 2, 2, 3, 2, 3, 3, 4, 5, 4, 6, 7, 6, 7, 8);
const obs$ = numbers$.pipe(distinctUntilChanged());
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'distinctUntilKeyChanged',
      code: `const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(distinctUntilKeyChanged('name'));
users$.subscribe((user) => console.log(user));`,
    },
    {
      id: 'elementAt',
      code: `const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(elementAt(3));
users$.subscribe((user) => console.log(user));`,
    },
    {
      id: 'filter',
      code: `const users$ = of(
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
`,
    },
    {
      id: 'first',
      code: `const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(
    first((user) => user.age > 3),
);
users$.subscribe((user) => console.log(user));
`,
    },
  ],
};
