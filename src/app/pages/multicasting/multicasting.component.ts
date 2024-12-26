import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConnectableObservable,
  fromEvent,
  interval,
  publish,
  share,
  shareReplay,
  Subscription,
  take,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { multicastings } from '../../info/multicastings';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-multicasting',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './multicasting.component.html',
  styleUrl: './multicasting.component.scss',
})
export class MulticastingComponent implements OnInit, AfterViewInit {
  public info!: IInfo;
  public subscription = new Subscription();

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
    this.info = multicastings;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorConnect();
    this.operatorShare();
    this.operatorShareReplay();
  }

  private operatorConnect(): void {
    const click$ = fromEvent(document.getElementById('btn-click-connect')!, 'click').pipe(take(1));
    const source$: ConnectableObservable<number> = interval(1000).pipe(
      take(5),
      publish(),
    ) as ConnectableObservable<number>;

    this.subscription.add(
      click$.subscribe(() => {
        source$.connect();
      }),
    );

    this.subscription.add(
      source$.subscribe((data: number) => this.addConsole('connect', data.toString())),
    );
  }

  private operatorShare(): void {
    const interval$ = interval(1000).pipe(take(10), share());
    this.subscription.add(
      interval$.subscribe((n: number) =>
        this.addConsole('share', 'First subscriber ' + n.toString()),
      ),
    );
    setTimeout(() => {
      this.subscription.add(
        interval$.subscribe((n: number) =>
          this.addConsole('share', 'Second subscriber ' + n.toString()),
        ),
      );
    }, 5000);
  }

  private operatorShareReplay(): void {
    const interval$ = interval(1000).pipe(take(10), shareReplay(3)); //we store the last 3 emissions
    this.subscription.add(
      interval$.subscribe((n: number) =>
        this.addConsole('shareReplay', 'First subscriber ' + n.toString()),
      ),
    );
    setTimeout(() => {
      this.subscription.add(
        interval$.subscribe((n: number) =>
          this.addConsole('shareReplay', 'Second subscriber ' + n.toString()),
        ),
      );
    }, 5000);
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
function replay(): import('rxjs').OperatorFunction<number, unknown> {
  throw new Error('Function not implemented.');
}
