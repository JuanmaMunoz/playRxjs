import { IInfo } from '../models/interfaces';

export const errors: IInfo = {
  url: 'operators/error',
  category: 'error',
  items: [
    {
      id: 'catchError',
      code: `const obs$ = throwError(new Error('server error')).pipe(
  timeout(2000),
  catchError(() => of([])),
);
obs$.subscribe((resp) => console.log(resp));`,
    },
    {
      id: 'retry',
      code: `const obs$ = ajax('https://fake.url.test.retry').pipe(retry(1));
obs$.subscribe({
  error: (err: HttpErrorResponse) => console.log((err.message)),
}),`,
    },
  ],
};
