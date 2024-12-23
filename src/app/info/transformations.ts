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
      id: 'exhaustMap',
      code: `fromEvent(document.getElementById('btn-start-exhaust-map')!, 'click')
    .pipe(
      delay(5000),
      exhaustMap(() => this.userService.getUsers())
    )
    .subscribe((data: IUser[]) => console.log(data));`,
    },
    {
      id: 'expand',
      code: `of(1)
    .pipe(
      expand((x) => of(x + 10)),
      take(5)
    )
    .subscribe((x: number) => this.addConsole('expand', x.toString()));`,
    },
    {
      id: 'groupBy',
      code: `const animals$ = from([
  { name: 'Rufy', species: 'cat' },
  { name: 'Benito', species: 'dog' },
  { name: 'Mini', species: 'cat' },
  { name: 'Pedro', species: 'dog' },
]);
      
const species$ = animals$.pipe(
  groupBy(({ species }) => species),
  mergeMap((species) => species.pipe(toArray()))
);
species$.subscribe((species) => console.log(species));`,
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
      id: 'mergeScan',
      code: `of(1, 10, 20)
    .pipe(
      mergeScan((acc: number, value: number) => {
        return of(acc + value);
      }, 0), // The accumulator starts at 0.
    )
    .subscribe((result: number) => console.log(result))`,
    },
    {
      id: 'pairwise',
      code: `of(1, 10, 20)
    .pipe(pairwise())
    .subscribe((result: number[]) => console.log(result))`,
    },
    {
      id: 'partition',
      code: `const animals$ = from([
  { name: 'Rufy', species: 'cat' },
  { name: 'Benito', species: 'dog' },
  { name: 'Mini', species: 'cat' },
  { name: 'Pedro', species: 'dog' },
  { name: 'Marc', species: 'monkey' },
]);
const [cats$, others$] = partition(animals$, ({ species }) => species === 'cat');
cats$.subscribe((cats) => console.log(cats))`,
    },
    {
      id: 'pluck',
      code: `const animals$ = from([
  { name: 'Rufy', species: 'cat' },
  { name: 'Benito', species: 'dog' },
  { name: 'Mini', species: 'cat' },
  { name: 'Pedro', species: 'dog' },
]);    
animals$
  .pipe(pluck('name'))
  .subscribe((name: string) => console.log(name))`,
    },
    {
      id: 'scan',
      code: `of(1, 10, 20)
  .pipe(scan((acc: number, value: number) => acc + value))
  .subscribe((result: number) => console.log(result))`,
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
    {
      id: 'window',
      code: `const source$ = interval(1000);
const closingNotifier$ = interval(3000);
source$
    .pipe(
      window(closingNotifier$),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`,
    },
    {
      id: 'windowCount',
      code: `const source$ = of(1, 2, 3, 4, 5, 6);
source$
    .pipe(
      windowCount(3, 2), // Windows of 3 elements, starting every 2 values
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`,
    },
    {
      id: 'windowTime',
      code: `const source$ = interval(1000);
source$
    .pipe(
      windowTime(3000),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`,
    },
    {
      id: 'windowToogle',
      code: `const source$ = interval(1000);
const openings$ = interval(5000);
const closings = () => interval(3000);
this.subscription.add(
  source$
    .pipe(
      windowToggle(openings$, closings),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`,
    },
    {
      id: 'windowWhen',
      code: `const source$ = interval(1000);
source$
    .pipe(
      windowWhen(() => interval(3000)),
      mergeMap((window$) => window$.pipe(toArray())),
    )
    .subscribe((data: number[]) => console.log(data))`,
    },
  ],
};
