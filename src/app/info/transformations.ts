import { IInfo } from '../models/interfaces';

export const transformations: IInfo[] = [
  {
    category: 'operators/transformation',
    id: 'map',
    title: 'Operator map',
    description:
      "<p>The map operator in RxJS applies a function to each value emitted by an observable and returns an observable that emits the transformed values.<p><p>In this example, we transform the user's name using the map operator and use the array's map method to update the name of each item within it.</p>",
    output:
      "// Output: [{'name':'Jhon de todos los santos','firstName':'Trump','age':40,'job':'Front end developer','salary':30000},{'name':'Patricia de todos los santos','firstName':'Biden','age':36,'job':'Quality Manager','salary':40000},{'name':'Benito de todos los santos','firstName':'Aznar','age':12,'job':'Youtuber','salary':50000}]",
    code: `this.userService
    .getUsers()
    .pipe(
      map((e: IUser[]) =>
        e.map((u: IUser) => ({ ...u, name: u.name + ' de todos los santos' }))
      )
    )
    .subscribe((data: IUser[]) => console.log(data));`,
  },

  {
    category: 'operators/transformation',
    id: 'mapTo',
    title: 'Operator mapTo',
    description:
      '<p>The mapTo operator in RxJS replaces each value emitted by an observable with a specific value you provide.</p><p>In this example, with the mapTo operator, we replace all values from the observable with the value <b>strawberry</b>.</p>',
    output: '// Output: strawberry // 3 times',
    code: `from(['orange', 'lemon', 'melon'])
      .pipe(mapTo('strawberry'))
      .subscribe((data: string) => console.log(data));`,
  },

  {
    category: 'operators/transformation',
    id: 'mergeMap',
    title: 'Operator mergeMap',
    description:
      '<p>The mergeMap operator in RxJS is used to transform the values emitted by an observable into other observables and then <b>"flattens"</b> or combines all those emissions into a single data stream. This is useful when you want to perform multiple asynchronous operations in sequence and combine their results.</p><p>In this example, we merge an observable made up of a list of letters with an observable containing a numeric range from 1 to 2.</p>',
    output: `// Output:<br>
    a + 1 = ? <br>
    a + 2 = ? <br>
    b + 1 = ? <br>
    b + 2 = ? <br>
    c + 1 = ? <br>
    c + 2 = ? <br>
  `,
    code: `from(['a', 'b', 'c'])
      .pipe(
        mergeMap((e: string) =>
          range(1, 2).pipe(map((n: number) => e + ' + ' + n + ' = ?'))
        )
      )
      .subscribe((data: string) => console.log(data));`,
  },
  {
    category: 'operators/transformation',
    id: 'mergeMapTo',
    title: 'Operator mergeMapTo',
    description:
      '<p>The mergeMapTo operator in RxJS is used to replace each value emitted by an observable with a different observable that you specify, and it then "flattens" all the results into a single output stream.</p><p>In this example, we merge an observable made up of a list of letters with an observable containing a numeric range from 1 to 2. <b>Unlike mergeMap</b>, we don`t take into account the output of the first observable, emitting the <b>same value</b> for each letter.</p>',
    output: `// Output:<br>
    the same output + 1 = ? <br>
    the same output + 2 = ? <br>
    the same output + 1 = ? <br>
    the same output + 2 = ? <br>
    the same output + 1 = ? <br>
    the same output + 2 = ? <br>
  `,
    code: `from(['a', 'b', 'c'])
      .pipe(
        mergeMapTo(range(1, 2).pipe(map((n: number) => 'the same output' + ' + ' + n + ' = ?'))))
      .subscribe((data: string) => console.log(data));`,
  },
  {
    category: 'operators/transformation',
    id: 'switchMap',
    title: 'Operator switchMap',
    description:
      '<p>The switchMap operator in RxJS is used to switch from one observable to a new one whenever a new value is emitted by the original observable. When this happens, switchMap <b>cancels (or "unsubscribes" from)</b> the previous observable and only listens to the latest one.</p>In this example, we merge the observable from a button click event with an observable created using an interval. We cancel the resulting observable when the stop button is clicked using the takeUntil operator. Each time we click the start button, we can see in the console how the previous observable is canceled.<p>',
    output: `//output:<br>
  btn btn--primary 0 <br>
  btn btn--primary 1 <br>
  btn btn--primary 2 //... until we press the stop button
  `,
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
    category: 'operators/transformation',
    id: 'concatMap',
    title: 'Operator concatMap',
    description:
      '<p>The concatMap operator in RxJS is used to queue up observables one after another, ensuring they run in sequence. When concatMap receives a value, it maps that value to a new observable (like a network request or a timer) and waits for it to complete before moving to the next one.<p><p>In this example, we merge the observable from a button click event with the observable created using an interval. We cancel the resulting observable when we click the stop button using the takeUntil operator. Each time we click the start button, we can see in the console how the observables are concatenated in an orderly manner, respecting their sequence.</p>',
    output: `//output:<br>
  btn btn--primary 0 <br>
  btn btn--primary 1 <br>
  btn btn--primary 2 //... until we press the stop button
  `,
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
];
