import { IInfo } from '../models/interfaces';

export const basics: IInfo = {
  url: 'basicConcepts',
  category: 'basicConcepts',
  items: [
    {
      id: 'observableObserverSubscription',
      code: `// 1. We define an Observable"
const observable = new Observable<number>((subscriber) => {
  console.log('Observable starts emitting values');

  // Emit some values
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  // Complete the emission of values
  subscriber.complete();
});

// 2. We define an Observer
const observer = {
  next: (value: number) => console.log('Value ->', value), // Handles the emitted values
  error: (err: any) => console.log('Error:', err), // Handles the error
  complete: () => console.log('Complete!'), // Handles the completion (No Error)
};

// 3. We create the subscription
const subscription = observable.subscribe(observer);

// 4. Here you can cancel the subscription if you wish.
subscription.unsubscribe();`,
    },
    {
      id: 'unsubscribe',
      code: `let subscription = new Subscription();
      
const createSubscription = () => {
  subscription = interval(1000).subscribe((n: number) => console.log(n));
};

fromEvent(document.getElementById('btn-click-subscribe')!, 'click').subscribe(() => {
  if (!subscription.closed) subscription.unsubscribe();
  createSubscription();
});
fromEvent(document.getElementById('btn-click-unsubscribe')!, 'click').subscribe(() =>
  subscription.unsubscribe(),
);`,
    },
    {
      id: 'unsubscribeSeveral',
      code: `let subscription = new Subscription();
      
const createSubscription = () => {
  subscription = interval(1000).subscribe((n: number) => console.log(n));
};

fromEvent(document.getElementById('btn-click-subscribe')!, 'click').subscribe(() => {
  if (!subscription.closed) subscription.unsubscribe();
  createSubscription();
});
fromEvent(document.getElementById('btn-click-unsubscribe')!, 'click').subscribe(() =>
  subscription.unsubscribe(),
);`,
    },
  ],
};
