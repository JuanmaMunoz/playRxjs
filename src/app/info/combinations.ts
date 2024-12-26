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
  ],
};
