import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  defer,
  from,
  fromEvent,
  generate,
  iif,
  interval,
  of,
  range,
  Subscription,
  throwError,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { creations } from '../../info/creations';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-creation',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss',
})
export class CreationComponent implements OnInit, AfterViewInit, OnDestroy {
  public info!: IInfo;
  public subscription = new Subscription();

  private renderer = inject(Renderer2);
  private route = inject(ActivatedRoute);
  private introductionService = inject(IntroductionService);

  ngOnInit(): void {
    this.info = creations;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorAjax();
    this.operatorDefer();
    this.operatorFrom();
    this.operatorFromEvent();
    this.operatorGenerate();
    this.operatorIif();
    this.operatorInterval();
    this.operatorOf();
    this.operatorRange();
    this.operatorThrowError();
    this.operatorTimer();
  }

  private operatorAjax(): void {
    const obs$ = ajax('https://jsonplaceholder.typicode.com/posts');
    this.subscription.add(
      obs$.subscribe({
        next: (response) => this.addConsole('ajax', 'response-> ' + JSON.stringify(response)),
        error: (err) => this.addConsole('ajax', 'error-> ' + JSON.stringify(err)),
        complete: () => this.addConsole('ajax', 'complete ****'),
      }),
    );
  }

  private operatorDefer(): void {
    const obs$ = defer(() => {
      const currentTime = new Date().toLocaleTimeString();
      return of('Hora actual: ' + currentTime);
    });
    this.subscription.add(obs$.subscribe((data) => this.addConsole('defer', JSON.stringify(data))));

    setTimeout(() => {
      this.subscription.add(
        obs$.subscribe((data) => this.addConsole('defer', JSON.stringify(data))),
      );
    }, 2000);
  }

  private operatorFrom(): void {
    const obs1$ = from('hello');
    const obs2$ = from([1, 2, 3]);
    this.subscription.add(obs1$.subscribe((data) => this.addConsole('from', data)));
    this.subscription.add(obs2$.subscribe((data) => this.addConsole('from', data.toString())));
  }

  private operatorFromEvent(): void {
    const obs$ = fromEvent<KeyboardEvent>(document, 'keydown');
    this.subscription.add(
      obs$.subscribe((event) => this.addConsole('fromEvent', 'The key pressed is ' + event.key)),
    );
  }

  private operatorGenerate(): void {
    const obs$ = generate(
      1, // Initial state
      (x) => x <= 64, // Condition to continue
      (x) => x * 2, // How to update the state (double the value)
    );
    this.subscription.add(obs$.subscribe((data) => this.addConsole('generate', data.toString())));
  }

  private operatorIif(): void {
    const condition = 5 > 10;
    const obs$ = iif(
      () => condition, // Condition (if true, it will emit the first observable)
      of('Condition is true'), // First observable
      of('Condition is false'), // Second observable
    );
    this.subscription.add(obs$.subscribe((data) => this.addConsole('iif', data)));
  }

  private operatorInterval(): void {
    const obs$ = interval(2000); // Emits an incremental number every 2 seconds.
    this.subscription.add(
      obs$.subscribe((data: number) => this.addConsole('interval', data.toString())),
    );
  }

  private operatorOf(): void {
    const obs1$ = of('hello');
    const obs2$ = of([1, 2, 3]);
    this.subscription.add(obs1$.subscribe((data) => this.addConsole('of', data)));
    this.subscription.add(obs2$.subscribe((data) => this.addConsole('of', JSON.stringify(data))));
  }

  private operatorRange(): void {
    const obs$ = range(1, 5);
    this.subscription.add(
      obs$.subscribe((data: number) => this.addConsole('range', data.toString())),
    );
  }

  private operatorThrowError(): void {
    const error$ = throwError({ error: { status: 500, message: 'Server error' } });
    this.subscription.add(
      error$.subscribe({
        //next: () => {},
        error: (e: HttpErrorResponse) => this.addConsole('throwError', JSON.stringify(e)),
      }),
    );
  }

  private operatorTimer(): void {
    const obs$ = timer(2000); // Emits after two seconds.
    this.subscription.add(obs$.subscribe(() => this.addConsole('timer', 'Hello world!!!')));
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
