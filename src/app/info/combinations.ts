import { IInfo } from '../models/interfaces';

export const combinations: IInfo = {
  url: 'operators/combination',
  category: 'combination',
  items: [
    {
      id: 'combineLatest',
      code: `const obs1$ = of(1, 2);
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
combineLatest([obs1$, obs2$, obs3$]).subscribe((data) =>
    console.log(data))`,
    },
    {
      id: 'concat',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
concat(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`,
    },
    {
      id: 'concatAll',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(
    map((obs) => obs), // We transform the values into observables
    concatAll(), // Concatenates the values of the emitted observables
  )
  .subscribe((data) => console.log(data))`,
    },
    {
      id: 'exhaust',
      code: `const obs1$ = of(1, 2);
const obs2$ = of('a', 'b').pipe(delay(3000));
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(exhaust())
  .subscribe((data) => console.log(data))`,
    },
    {
      id: 'forkJoin',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
forkJoin(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`,
    },
    {
      id: 'merge',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
merge(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`,
    },
    {
      id: 'mergeAll',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(
    map((obs) => obs), // We transform the values into observables
    mergeAll(), // Concatenates the values of the emitted observables
  )
  .subscribe((data) => console.log(data))`,
    },
    {
      id: 'race',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
race(obs1$, obs2$, obs3$).subscribe((data) =>
    console.log(data))`,
    },
    {
      id: 'startWith',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
obs1$.pipe(startWith(0)).subscribe((data:number) =>
    console.log(data))`,
    },
    {
      id: 'switchAll',
      code: `const obs1$ = of(1, 2).pipe(delay(2000));
const obs2$ = of('a', 'b');
const obs3$ = of(3, 4, 5);
const obsAll$ = of(obs1$, obs2$, obs3$);
obsAll$
  .pipe(
    map((obs) => obs), // We transform the values into observables
    switchAll(), // Concatenates the values of the emitted observables
  )
  .subscribe((data) => console.log(data))`,
    },
    {
      id: 'withLatestFrom',
      code: `const obs1$ = of(1, 2);
const obs2$ = of('a', 'b');
const obsAll$ = of(obs1$, obs2$, obs3$);
obs1$
  .pipe(
    withLatestFrom(obs2$),
    map(([obs1, obs2]) => obs1 + ' - ' + obs2),
  )
  .subscribe((data) => console.log(data))`,
    },
  ],
};
