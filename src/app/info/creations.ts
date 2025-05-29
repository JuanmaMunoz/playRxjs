import { IInfo } from '../models/interfaces';

export const creations: IInfo = {
  url: 'operators/creation',
  category: 'creation',
  items: [
    {
      id: 'ajax',
      code: `const obs$ = ajax('https://jsonplaceholder.typicode.com/posts');
obs$.subscribe({
  next: (response) => console.log('response-> ' + response),
  error: (err) => console.log('error-> ' + err),
  complete: () => console.log('complete ****'),
});
`,
    },
    {
      id: 'defer',
      code: `const obs$ = defer(() => {
const currentTime = new Date().toLocaleTimeString();
  return of('Hora actual: ' + currentTime);
});
obs$.subscribe((data) => console.log(data));
setTimeout(() => {
  obs$.subscribe((data) => console.log(data)),
}, 2000);
`,
    },
    {
      id: 'from',
      code: `const obs1$ = from('hello');
const obs2$ = from([1, 2, 3]);
obs1$.subscribe((data) => console.log(data));
obs2$.subscribe((data) => console.log(data));`,
    },
    {
      id: 'fromEvent',
      code: `const obs$ = fromEvent<KeyboardEvent>(document, 'keydown');
obs$.subscribe((event) => console.log('The key pressed is ' + event.key))`,
    },
    {
      id: 'generate',
      code: `const obs$ = generate(
  1, // Initial state
  (x) => x <= 64, // Condition to continue
  (x) => x * 2, // How to update the state (double the value)
);
obs$.subscribe((data) => console.log(data));
`,
    },
    {
      id: 'iif',
      code: `const condition = 5 > 10;
const obs$ = iif(
  () => condition, // Condition (if true, it will emit the first observable)
  of('Condition is true'), // First observable
  of('Condition is false'), // Second observable
);
obs$.subscribe((data) => console.log(data));
`,
    },
    {
      id: 'interval',
      code: `const obs$ = interval(2000); // Emits an incremental number every 2 seconds.
obs$.subscribe((data:number) => console.log(data));
`,
    },
    {
      id: 'of',
      code: `const obs1$ = from('hello');
const obs2$ = from([1, 2, 3]);
obs1$.subscribe((data) => console.log(data));
obs2$.subscribe((data) => console.log(data));`,
    },
    {
      id: 'range',
      code: `const obs$ = range(1,5);
obs$.subscribe((data:number) => console.log(data));
`,
    },
    {
      id: 'throwError',
      code: `const error$ = throwError({ error: { status: 500, message: 'Server error' } });
error$.subscribe({
  next: () => {},
  error: (e: HttpErrorResponse) => console.log(e),
})
`,
    },
    {
      id: 'timer',
      code: `const obs$ = timer(2000); // Emits after 2 seconds.
obs$.subscribe(() => console.log('Hello world!!!'));
`,
    },
  ],
};
