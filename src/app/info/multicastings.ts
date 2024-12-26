import { IInfo } from '../models/interfaces';

export const multicastings: IInfo = {
  url: 'operators/multicasting',
  category: 'multicasting',
  items: [
    {
      id: 'connect',
      code: `const click$ = fromEvent(document.getElementById('btn-click-connect')!, 'click').pipe(take(1));
const source$: ConnectableObservable<number> = interval(1000).pipe(
  take(5),
  publish(),
) as ConnectableObservable<number>;

click$.subscribe(() => {
    source$.connect();
});

source$.subscribe((data: number) => console.log(data));
`,
    },
    {
      id: 'share',
      code: `const interval$ = interval(1000).pipe(take(10), share());
interval$.subscribe((n: number) =>
  console.log('First subscriber ' + n),
);

setTimeout(() => {  
  interval$.subscribe((n: number) =>
    console.log('Second subscriber ' + n),
  );
}, 5000);

`,
    },
    {
      id: 'shareReplay',
      code: `const interval$ = interval(1000).pipe(take(10), shareReplay(3)); // we store the last 3 emissions
interval$.subscribe((n: number) =>
  console.log('First subscriber ' + n),
);

setTimeout(() => {  
  interval$.subscribe((n: number) =>
    console.log('Second subscriber ' + n),
  );
}, 5000);

`,
    },
  ],
};
