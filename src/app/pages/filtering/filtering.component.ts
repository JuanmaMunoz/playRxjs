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
  interval,
  of,
  Subscription,
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

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
