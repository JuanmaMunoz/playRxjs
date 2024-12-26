import { IInfo } from '../models/interfaces';

export const mathematicals: IInfo = {
  url: 'operators/mathematical',
  category: 'mathematical',
  items: [
    {
      id: 'count',
      code: `const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(count((n: number) => n > 3))
  .subscribe((data: number) => console.log(data))`,
    },
    {
      id: 'max',
      code: `const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(max())
  .subscribe((data: number) => console.log(data))`,
    },
    {
      id: 'min',
      code: `const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(min())
  .subscribe((data: number) => console.log(data))`,
    },
    {
      id: 'reduce',
      code: `const obs$ = of(1, 2, 3, 4, 5);
obs$
  .pipe(reduce((acc, value) => acc + value, 0))
  .subscribe((data: number) => console.log(data))`,
    },
  ],
};
