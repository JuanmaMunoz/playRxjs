import { IInfo } from '../models/interfaces';

export const transformations: IInfo = {
  url: 'operators/transformation',
  category: 'transformation',
  items: [
    {
      id: 'buffer',
      code: `const click$ = fromEvent(document.getElementById('btn-click-buffer')!,'click');
const triger$ = interval(3000);
click$.pipe(buffer(triger$))
      .subscribe((clicks: Event[]) => console.log(clicks.length));`,
    },
    {
      id: 'bufferCount',
      code: `const click$ = fromEvent(document.getElementById('btn-click-buffer-count')!,'click');
click$.pipe(bufferCount(5))
      .subscribe((clicks: Event[]) => console.log('5 clicks'));`,
    },
    {
      id: 'bufferTime',
      code: `const interval$ = interval(1000);
interval$.pipe(bufferTime(3000))
         .subscribe((n: number[]) => console.log(n));`,
    },
    {
      id: 'bufferToogle',
      code: `const start$ = fromEvent(document.getElementById('btn-click-buffer-toogle-start')!,'click');
const stop$ = () =>
    fromEvent(document.getElementById('btn-click-buffer-toogle-stop')!,'click');
const interval$ = interval(1000);
interval$.pipe(bufferToggle(start$, stop$))
         .subscribe((n: number[]) => console.log(n));`,
    },
    {
      id: 'bufferWhen',
      code: `const interval$ = interval(1000);
const click$ = fromEvent(document.getElementById('btn-click-buffer-when')!,'click');  
interval$.pipe(bufferWhen(() => click$))
         .subscribe((n: number[]) => console.log(n));`,
    },
    {
      id: 'map',
      code: `public getUsers(): Observable<IUser[]> {
    const url = 'assets/data/data2.json';
    return this.http.get<IUser[]>(url);
}

this.userService.getUsers()
    .pipe(
      map((e: IUser[]) =>
      e.map((u: IUser) => ({ ...u, name: u.name + ' ****--****' })))
    )
    .subscribe((data: IUser[]) => console.log(data));`,
    },
    {
      id: 'concatMap',
      code: `fromEvent(document.getElementById('btn-start-cc-map')!, 'click')
    .pipe(
      concatMap((e) =>
        interval(1000).pipe(map((n: number) => e.target.id + ' ' + n))
      )
    )
    .subscribe((data: string) => console.log(data))`,
    },
    {
      id: 'mapTo',
      code: `from(['orange', 'lemon', 'melon'])
    .pipe(mapTo('strawberry'))
    .subscribe((data: string) => console.log(data));`,
    },
    {
      id: 'mergeMap',
      code: `from(['a', 'b', 'c'])
    .pipe(
      mergeMap((e: string) =>
        range(1, 2).pipe(map((n: number) => e + ' + ' + n + ' = ?'))
      )
    )
    .subscribe((data: string) => console.log(data));`,
    },
    {
      id: 'mergeMapTo',
      code: `from(['a', 'b', 'c'])
    .pipe(
      mergeMapTo(range(1, 2).pipe(map((n: number) => 'the same output' + ' + ' + n + ' = ?')))
    )
    .subscribe((data: string) => console.log(data));`,
    },
    {
      id: 'switchMap',
      code: `fromEvent(document.getElementById('btn-start-sw-map')!, 'click')
    .pipe(
      switchMap((e) =>
        interval(1000).pipe(map((n: number) => e.target.id + ' ' + n))
      )
    )
    .subscribe((data: string) => console.log(data))`,
    },
  ],
};
