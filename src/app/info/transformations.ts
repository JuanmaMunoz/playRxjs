import { IInfo } from '../models/interfaces';

export const transformations: IInfo = {
  url: 'operators/transformation',
  category: 'transformation',
  items: [
    {
      id: 'map',
      code: `public getUsers(): Observable<IUser[]> {
      const url = 'assets/data/data2.json';
      return this.http.get<IUser[]>(url);
}

this.userService.getUsers()
      .pipe(
        map((e: IUser[]) =>
        e.map((u: IUser) => ({ ...u, name: u.name + ' de todos los santos' }))
      )
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
        mergeMapTo(range(1, 2).pipe(map((n: number) => 'the same output' + ' + ' + n + ' = ?'))))
      .subscribe((data: string) => console.log(data));`,
    },
    {
      id: 'switchMap',
      code: `fromEvent(document.getElementById('btn-start-sw-map')!, 'click')
        .pipe(
          switchMap((e) =>
            interval(1000).pipe(map((n: number) => e.target.className + ' ' + n))
          ),
          takeUntil(
            fromEvent(document.getElementById('btn-stop-sw-map')!, 'click')
          )
        )
        .subscribe((data: string) => console.log(data))`,
    },
    {
      id: 'concatMap',
      code: `fromEvent(document.getElementById('btn-start-sw-map')!, 'click')
      .pipe(
        concatMap((e) =>
          interval(1000).pipe(map((n: number) => e.target.className + ' ' + n))
        ),
        takeUntil(
          fromEvent(document.getElementById('btn-stop-sw-map')!, 'click')
        )
      )
      .subscribe((data: string) => console.log(data))`,
    },
  ],
};
