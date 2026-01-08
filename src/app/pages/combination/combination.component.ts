import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  concat,
  concatAll,
  delay,
  exhaust,
  forkJoin,
  map,
  merge,
  mergeAll,
  of,
  race,
  startWith,
  Subscription,
  switchAll,
  withLatestFrom,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { combinations } from '../../info/combinations';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-combination',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './combination.component.html',
  styleUrl: './combination.component.scss',
})
export class CombinationComponent implements OnInit, AfterViewInit, OnDestroy {
  public info!: IInfo;
  public subscription = new Subscription();

  private renderer = inject(Renderer2);
  private route = inject(ActivatedRoute);
  private introductionService = inject(IntroductionService);

  ngOnInit(): void {
    this.info = combinations;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorCombineLatest();
    this.operatorConcat();
    this.operatorConcatAll();
    this.operatorExhaust();
    this.operatorForkJoin();
    this.operatorMerge();
    this.operatorMergeAll();
    this.operatorRace();
    this.operatorStartWith();
    this.operatorSwitchAll();
    this.operatorwithLatestFrom();
  }

  private operatorCombineLatest(): void {
    const obs1$ = of(1, 2);
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    this.subscription.add(
      combineLatest([obs1$, obs2$, obs3$]).subscribe((data) =>
        this.addConsole('combineLatest', JSON.stringify(data)),
      ),
    );
  }

  private operatorConcat(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    this.subscription.add(
      concat(obs1$, obs2$, obs3$).subscribe((data) =>
        this.addConsole('concat', JSON.stringify(data)),
      ),
    );
  }

  private operatorConcatAll(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    const obsAll$ = of(obs1$, obs2$, obs3$);
    this.subscription.add(
      obsAll$
        .pipe(
          map((obs) => obs), // We transform the values into observables
          concatAll(), // Concatenates the values of the emitted observables
        )
        .subscribe((data) => this.addConsole('concatAll', JSON.stringify(data))),
    );
  }

  private operatorExhaust(): void {
    const obs1$ = of(1, 2);
    const obs2$ = of('a', 'b').pipe(delay(3000));
    const obs3$ = of(3, 4, 5);
    const obsAll$ = of(obs1$, obs2$, obs3$);
    this.subscription.add(
      obsAll$.pipe(exhaust()).subscribe((data) => this.addConsole('exhaust', JSON.stringify(data))),
    );
  }

  private operatorForkJoin(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    this.subscription.add(
      forkJoin(obs1$, obs2$, obs3$).subscribe((data) =>
        this.addConsole('forkJoin', JSON.stringify(data)),
      ),
    );
  }

  private operatorMerge(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    this.subscription.add(
      merge(obs1$, obs2$, obs3$).subscribe((data) =>
        this.addConsole('merge', JSON.stringify(data)),
      ),
    );
  }

  private operatorMergeAll(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    const obsAll$ = of(obs1$, obs2$, obs3$);
    this.subscription.add(
      obsAll$
        .pipe(
          map((obs) => obs), // We transform the values into observables
          mergeAll(), // Concatenates the values of the emitted observables
        )
        .subscribe((data) => this.addConsole('mergeAll', JSON.stringify(data))),
    );
  }

  private operatorRace(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    this.subscription.add(
      race(obs1$, obs2$, obs3$).subscribe((data) => this.addConsole('race', JSON.stringify(data))),
    );
  }

  private operatorStartWith(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    this.subscription.add(
      obs1$
        .pipe(startWith(0))
        .subscribe((data: number) => this.addConsole('startWith', data.toString())),
    );
  }

  private operatorSwitchAll(): void {
    const obs1$ = of(1, 2).pipe(delay(2000));
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    const obsAll$ = of(obs1$, obs2$, obs3$);
    this.subscription.add(
      obsAll$
        .pipe(
          map((obs) => obs), // We transform the values into observables
          switchAll(), // Concatenates the values of the emitted observables
        )
        .subscribe((data) => this.addConsole('switchAll', JSON.stringify(data))),
    );
  }

  private operatorwithLatestFrom(): void {
    const obs1$ = of(1, 2);
    const obs2$ = of('a', 'b');
    this.subscription.add(
      obs1$
        .pipe(
          withLatestFrom(obs2$),
          map(([obs1, obs2]) => obs1 + ' - ' + obs2),
        )
        .subscribe((data) => this.addConsole('withLatestFrom', JSON.stringify(data))),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
