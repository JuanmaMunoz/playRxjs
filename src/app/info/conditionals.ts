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
  .subscribe(.subscribe((data) =>console.log(data))`,
    },
    {
      id: 'every',
      code: `const obs1$ = of(5, 10, 20, 4);
obs1$
  .pipe(every((n: number) => n >= 5))
  .subscribe(.subscribe((data) =>console.log(data))`,
    },
  ],
};
