import { IInfo } from '../models/interfaces';

export const conditionals: IInfo = {
  url: 'operators/conditional',
  category: 'conditional',
  items: [
    {
      id: 'defaultIfEmpty',
      code: `const obs1$ = of();
obs1$
  .pipe(defaultIfEmpty('No Data'))
  .subscribe((data) =>console.log(data))`,
    },
    {
      id: 'every',
      code: `const obs1$ = of(5, 10, 20, 4);
obs1$
  .pipe(every((n: number) => n >= 5))
  .subscribe((data) =>console.log(data))`,
    },
    {
      id: 'find',
      code: `const obs1$ = of(5, 10, 20, 4);
obs1$
  .pipe(find((n: number) => n >= 5))
  .subscribe((data: number | undefined) => console.log(data))`,
    },
    {
      id: 'findIndex',
      code: `const obs1$ = of(5, 10, 20, 4);
obs1$
  .pipe(findIndex((n: number) => n >= 5))
  .subscribe((data: number | undefined) => console.log(data))`,
    },
    {
      id: 'isEmpty',
      code: `const obs1$ = of();
obs1$
  .pipe(isEmpty())
  .subscribe((data:boolean) =>console.log(data))`,
    },
    {
      id: 'sequenceEqual',
      code: ` const obs1$ = of(5, 10, 20, 4);
const obs2$ = of(5, 10, 20, 3);
obs1$
  .pipe(sequenceEqual(obs2$))
  .subscribe((data:boolean) =>console.log(data))`,
    },
  ],
};
