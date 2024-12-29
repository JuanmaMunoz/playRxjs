import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  audit,
  auditTime,
  debounce,
  debounceTime,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  filter,
  first,
  fromEvent,
  ignoreElements,
  interval,
  last,
  of,
  sample,
  sampleTime,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  Subscription,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  throttle,
  throttleTime,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { filterings } from '../../info/filterings';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.scss',
})
export class FilteringComponent implements OnInit, AfterViewInit {
  public info!: IInfo;
  public subscription = new Subscription();

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
    this.info = filterings;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorAudit();
    this.operatorAuditTime();
    this.operatorDebounce();
    this.operatorDebounceTime();
    this.operatorDistinct();
    this.operatorDistinctUntilChanged();
    this.operatorDistinctUntilKeyChanged();
    this.operatorElementAt();
    this.operatorFilter();
    this.operatorFirst();
    this.operatorIgnoreElements();
    this.operatorLast();
    this.operatorSample();
    this.operatorSampleTime();
    this.operatorSingle();
    this.operatorSkip();
    this.operatorSkipLast();
    this.operatorSkipUntil();
    this.operatorSkipWhile();
    this.operatorTake();
    this.operatorTakeLast();
    this.operatorTakeUntil();
    this.operatorTakeWhile();
    this.operatorThrottle();
    this.operatorThrottleTime();
  }

  private operatorAudit(): void {
    const click$ = fromEvent(document.getElementById('btn-click-audit')!, 'click');
    const obs$ = click$.pipe(audit(() => interval(2000)));
    this.subscription.add(obs$.subscribe(() => this.addConsole('audit', 'Click made!!')));
  }

  private operatorAuditTime(): void {
    const click$ = fromEvent(document.getElementById('btn-click-audit-time')!, 'click');
    const obs$ = click$.pipe(auditTime(2000));
    this.subscription.add(obs$.subscribe(() => this.addConsole('auditTime', 'Click made!!')));
  }

  private operatorDebounce(): void {
    const keys$ = fromEvent<KeyboardEvent>(document, 'keydown');
    const obs$ = keys$.pipe(debounce(() => interval(1000)));
    this.subscription.add(
      obs$.subscribe((event) =>
        this.addConsole('debounce', 'The last key pressed is ' + event.key),
      ),
    );
  }

  private operatorDebounceTime(): void {
    const keys$ = fromEvent<KeyboardEvent>(document, 'keydown');
    const obs$ = keys$.pipe(debounceTime(1000));
    this.subscription.add(
      obs$.subscribe((event) =>
        this.addConsole('debounceTime', 'The last key pressed is ' + event.key),
      ),
    );
  }

  private operatorDistinct(): void {
    const numbers$ = of(1, 2, 3, 2, 2, 3, 3, 4, 5, 4, 6, 7, 6, 7, 8);
    const obs$ = numbers$.pipe(distinct());
    this.subscription.add(
      obs$.subscribe((number: number) => this.addConsole('distinct', number.toString())),
    );
  }

  private operatorDistinctUntilChanged(): void {
    const numbers$ = of(1, 2, 3, 2, 2, 3, 3, 4, 5, 4, 6, 7, 6, 7, 8);
    const obs$ = numbers$.pipe(distinctUntilChanged());
    this.subscription.add(
      obs$.subscribe((number: number) =>
        this.addConsole('distinctUntilChanged', number.toString()),
      ),
    );
  }

  private operatorDistinctUntilKeyChanged(): void {
    const users$ = of(
      { name: 'Jhon', age: 2 },
      { name: 'Jhon', age: 3 },
      { name: 'Mari', age: 4 },
      { name: 'Mari', age: 4 },
      { name: 'Beni', age: 5 },
    ).pipe(distinctUntilKeyChanged('name'));

    this.subscription.add(
      users$.subscribe((user) => this.addConsole('distinctUntilKeyChanged', JSON.stringify(user))),
    );
  }

  private operatorElementAt(): void {
    const users$ = of(
      { name: 'Jhon', age: 2 },
      { name: 'Jhon', age: 3 },
      { name: 'Mari', age: 4 },
      { name: 'Mari', age: 4 },
      { name: 'Beni', age: 5 },
    ).pipe(elementAt(3));

    this.subscription.add(
      users$.subscribe((user) => this.addConsole('elementAt', JSON.stringify(user))),
    );
  }

  private operatorFilter(): void {
    const users$ = of(
      { name: 'Jhon', age: 2 },
      { name: 'Jhon', age: 3 },
      { name: 'Mari', age: 4 },
      { name: 'Mari', age: 4 },
      { name: 'Beni', age: 5 },
    ).pipe(
      distinctUntilKeyChanged('name'),
      filter((user) => user.age > 3),
    );

    this.subscription.add(
      users$.subscribe((user) => this.addConsole('filter', JSON.stringify(user))),
    );
  }

  private operatorFirst(): void {
    const users$ = of(
      { name: 'Jhon', age: 2 },
      { name: 'Jhon', age: 3 },
      { name: 'Mari', age: 4 },
      { name: 'Mari', age: 4 },
      { name: 'Beni', age: 5 },
    ).pipe(first((user) => user.age > 3));

    this.subscription.add(
      users$.subscribe((user) => this.addConsole('first', JSON.stringify(user))),
    );
  }

  private operatorIgnoreElements(): void {
    const users$ = of(1).pipe(ignoreElements());

    this.subscription.add(
      users$.subscribe({
        next: (e: number) => this.addConsole('ignoreElements', 'success'), // It never runs.
        error: () => this.addConsole('ignoreElements', 'error'), // It passes errors
        complete: () => this.addConsole('ignoreElements', 'complete'), // It passes the completion signal
      }),
    );
  }

  private operatorLast(): void {
    const users$ = of(
      { name: 'Jhon', age: 2 },
      { name: 'Jhon', age: 3 },
      { name: 'Mari', age: 4 },
      { name: 'Mari', age: 4 },
      { name: 'Beni', age: 5 },
    ).pipe(last((user) => user.age > 5, 'No user was found'));

    this.subscription.add(
      users$.subscribe((user) => this.addConsole('last', JSON.stringify(user))),
    );
  }

  private operatorSample(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(sample(interval(5000)));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('sample', JSON.stringify(n))),
    );
  }

  private operatorSampleTime(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(sampleTime(3000));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('sampleTime', JSON.stringify(n))),
    );
  }

  private operatorSingle(): void {
    const numbers$ = of(1, 2, 3, 4, 5);
    const obs1$ = numbers$.pipe(single((n: number) => n >= 5));
    const obs2$ = numbers$.pipe(single((n: number) => n >= 4));
    this.subscription.add(
      obs1$.subscribe((n: number) => this.addConsole('single', JSON.stringify(n))),
    );
    this.subscription.add(
      obs2$.subscribe({
        error: (e: Error) => this.addConsole('single', JSON.stringify(e.message)),
      }),
    );
  }

  private operatorSkip(): void {
    const numbers$ = of(1, 2, 3, 4);
    const obs$ = numbers$.pipe(skip(2));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('skip', JSON.stringify(n))),
    );
  }

  private operatorSkipLast(): void {
    const numbers$ = of(1, 2, 3, 4);
    const obs$ = numbers$.pipe(skipLast(2));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('skipLast', JSON.stringify(n))),
    );
  }

  private operatorSkipUntil(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(skipUntil(interval(3000)));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('skipUntil', JSON.stringify(n))),
    );
  }

  private operatorSkipWhile(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(skipWhile((n: number) => n < 5));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('skipWhile', JSON.stringify(n))),
    );
  }

  private operatorTake(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(take(5));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('take', JSON.stringify(n))),
    );
  }

  private operatorTakeLast(): void {
    const numbers$ = of(1, 2, 3, 4);
    const obs$ = numbers$.pipe(takeLast(2));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('takeLast', JSON.stringify(n))),
    );
  }

  private operatorTakeUntil(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(takeUntil(interval(3000)));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('takeUntil', JSON.stringify(n))),
    );
  }

  private operatorTakeWhile(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(takeWhile((n: number) => n < 5));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('takeWhile', JSON.stringify(n))),
    );
  }

  private operatorThrottle(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(throttle(() => interval(5000)));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('throttle', JSON.stringify(n))),
    );
  }

  private operatorThrottleTime(): void {
    const interval$ = interval(1000);
    const obs$ = interval$.pipe(throttleTime(5000));
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('throttleTime', JSON.stringify(n))),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
