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
    {
      id: 'ignoreElements',
      code: `const users$ = of(1).pipe(ignoreElements());
users$.subscribe({
  next: (e: number) => console.log('success'), // It never runs.
  error: () => console.log('error'), // It passes errors
  complete: () => console.log('complete'), // It passes the completion signal
})
`,
    },
    {
      id: 'last',
      code: `const users$ = of(
  { name: 'Jhon', age: 2 },
  { name: 'Jhon', age: 3 },
  { name: 'Mari', age: 4 },
  { name: 'Mari', age: 4 },
  { name: 'Beni', age: 5 },
).pipe(last((user) => user.age > 5, 'No user was found'));
);
users$.subscribe((user) => console.log(user));
`,
    },
    {
      id: 'sample',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(sample(interval(5000)));
obs$.subscribe((n: number) => console.log(n));
`,
    },
    {
      id: 'sampleTime',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(sampleTime(3000));
obs$.subscribe((n: number) => console.log(n));
`,
    },
    {
      id: 'single',
      code: `const numbers$ = of(1, 2, 3, 4, 5);
const obs1$ = numbers$.pipe(single((n: number) => n >= 5));
const obs2$ = numbers$.pipe(single((n: number) => n >= 4)); // It will throw an error when more than one result is found.
obs1$.subscribe((n: number) => console.log(n));
obs2$.subscribe({
  error: (e: Error) => console.log(e.message))
});
`,
    },
    {
      id: 'skip',
      code: `const numbers$ = of(1, 2, 3, 4);
const obs$ = numbers$.pipe(skip(2));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'skipLast',
      code: `const numbers$ = of(1, 2, 3, 4);
const obs$ = numbers$.pipe(skipLast(2));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'skipUntil',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(skipUntil(interval(3000)));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'skipWhile',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(skipWhile((n:number)=> n < 5));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'take',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(take(5));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'takeLast',
      code: `const numbers$ = of(1, 2, 3, 4);
const obs$ = numbers$.pipe(takeLast(2));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'takeUntil',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(takeUntil(interval(3000)));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'takeWhile',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(takeWhile((n:number)=> n < 5));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'throttle',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(throttle(() => interval(5000)));
obs$.subscribe((number: number) => console.log(number));`,
    },
    {
      id: 'throttleTime',
      code: `const interval$ = interval(1000);
const obs$ = interval$.pipe(throttleTime(5000));
obs$.subscribe((number: number) => console.log(number));`,
    },
  ],
};
