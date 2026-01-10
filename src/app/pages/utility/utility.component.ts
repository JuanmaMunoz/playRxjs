import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  delay,
  delayWhen,
  dematerialize,
  finalize,
  interval,
  materialize,
  of,
  repeat,
  Subscription,
  take,
  tap,
  timeInterval,
  timeout,
  timer,
  timestamp,
  toArray,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { utilitys } from '../../info/utilitys';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-utility',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss',
})
export class UtilityComponent implements OnInit, AfterViewInit, OnDestroy {
  public info!: IInfo;
  public subscription = new Subscription();

  private renderer = inject(Renderer2);
  private route = inject(ActivatedRoute);
  private introductionService = inject(IntroductionService);

  ngOnInit(): void {
    this.info = utilitys;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorDelay();
    this.operatorWhen();
    this.operatorDematerialize();
    this.operatorFinalize();
    this.operatorMaterialize();
    this.operatorRepeat();
    this.operatorTap();
    this.operatorTimeInterval();
    this.operatorTimeout();
    this.operatorTimestamp();
    this.operatorToArray();
  }

  private operatorDelay(): void {
    const obs$ = of('hello world!!!').pipe(delay(2000));
    this.subscription.add(obs$.subscribe((resp: string) => this.addConsole('delay', resp)));
  }

  private operatorWhen(): void {
    const obs$ = of('error', 'success').pipe(
      delayWhen((resp: string) => timer(resp === 'error' ? 2000 : 0)),
    );
    this.subscription.add(obs$.subscribe((resp: string) => this.addConsole('delayWhen', resp)));
  }

  private operatorDematerialize(): void {
    const obs$ = of(1, 2, 3).pipe(materialize(), dematerialize());
    this.subscription.add(
      obs$.subscribe((n: number) => this.addConsole('dematerialize', n.toString())),
    );
  }

  private operatorFinalize(): void {
    const obs$ = of(1, 2, 3).pipe(finalize(() => this.addConsole('finalize', 'Finalize!!')));
    this.subscription.add(obs$.subscribe((n: number) => this.addConsole('finalize', n.toString())));
  }

  private operatorMaterialize(): void {
    const obs$ = of(1, 2, 3).pipe(materialize());
    this.subscription.add(
      obs$.subscribe((resp) => this.addConsole('materialize', JSON.stringify(resp))),
    );
  }

  private operatorRepeat(): void {
    const obs$ = of(1, 2, 3).pipe(repeat(2));
    this.subscription.add(obs$.subscribe((n: number) => this.addConsole('repeat', n.toString())));
  }

  private operatorTap(): void {
    const obs$ = of(1, 2, 3).pipe(
      tap((n: number) => this.addConsole('tap', 'tap-> ' + n.toString())),
    );
    this.subscription.add(obs$.subscribe((n: number) => this.addConsole('tap', n.toString())));
  }

  private operatorTimeInterval(): void {
    const obs$ = interval(1000).pipe(timeInterval());
    this.subscription.add(
      obs$.subscribe((resp) => this.addConsole('timeInterval', JSON.stringify(resp))),
    );
  }

  private operatorTimeout(): void {
    const obs$ = timer(3000).pipe(timeout(2000));
    this.subscription.add(
      obs$.subscribe({
        error: (e: Error) => this.addConsole('timeout', JSON.stringify(e.message)),
      }),
    );
  }

  private operatorTimestamp(): void {
    const obs$ = interval(1000).pipe(timestamp());
    this.subscription.add(
      obs$.subscribe((resp) => this.addConsole('timestamp', JSON.stringify(resp))),
    );
  }

  private operatorToArray(): void {
    const obs$ = interval(1000).pipe(take(10), toArray());
    this.subscription.add(
      obs$.subscribe((numbers: number[]) => this.addConsole('toArray', JSON.stringify(numbers))),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
