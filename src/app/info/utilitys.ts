import { IInfo } from '../models/interfaces';

export const utilitys: IInfo = {
  url: 'operators/utility',
  category: 'utility',
  items: [
    {
      id: 'delay',
      code: `const obs$ = of('hello world!!!').pipe(delay(2000));
obs$.subscribe((resp:string) => console.log(resp));`,
    },
    {
      id: 'delayWhen',
      code: `const obs$ = of('error', 'success').pipe(
delayWhen((resp: string) => timer(resp === 'error' ? 2000 : 0)));
obs$.subscribe((resp:string) => console.log(resp));`,
    },
    {
      id: 'dematerialize',
      code: `const obs$ = of(1, 2, 3).pipe(materialize(), dematerialize());
obs$.subscribe((n:number) => console.log(n));`,
    },
    {
      id: 'finalize',
      code: `const obs$ = of(1, 2, 3).pipe(finalize(() => console.log('finalize'));
obs$.subscribe((n:number) => console.log(n));`,
    },
    {
      id: 'materialize',
      code: `const obs$ = of(1, 2, 3).pipe(materialize());
obs$.subscribe((resp) => console.log(resp));`,
    },
    {
      id: 'repeat',
      code: `const obs$ = of(1, 2, 3).pipe(repeat(2));
obs$.subscribe((n:number) => console.log(n));`,
    },
    {
      id: 'tap',
      code: `const obs$ = of(1, 2, 3).pipe(tap((n:number)=> console.log('tap->' +  n)));
obs$.subscribe((n:number) => console.log(n));`,
    },
    {
      id: 'timeInterval',
      code: `const obs$ = interval(1000).pipe(timeInterval());
obs$.subscribe((resp) => console.log(resp));`,
    },
    {
      id: 'timeout',
      code: `const obs$ = timer(3000).pipe(timeout(2000));
obs$.subscribe({
  error: (e: Error) => console.log(e.message),
}),`,
    },
    {
      id: 'timestamp',
      code: `const obs$ = interval(1000).pipe(timestamp());
obs$.subscribe((resp) => console.log(resp));`,
    },
    {
      id: 'toArray',
      code: `const obs$ = interval(1000).pipe(take(10), toArray());
obs$.subscribe((numbers: number[]) => console.log(numbers));`,
    },
  ],
};
