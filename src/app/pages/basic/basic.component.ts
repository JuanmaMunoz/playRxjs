import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { basics } from '../../info/basic';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent implements OnInit, AfterViewInit, OnDestroy {
  public info!: IInfo;
  public subscription = new Subscription();
  public subscription2 = new Subscription();
  private renderer = inject(Renderer2);
  private route = inject(ActivatedRoute);
  private introductionService = inject(IntroductionService);

  ngOnInit(): void {
    this.info = basics;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.observables();
    this.unsubscribes();
    this.unsubscribesSeveral();
  }

  private observables(): void {
    // 1. We define an Observable"
    const observable = new Observable<number>((subscriber) => {
      this.addConsole('observableObserverSubscription', 'Observable starts emitting values');

      // Emit some values
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);

      // Complete the emission of values
      subscriber.complete();
    });

    // 2. We define an Observer
    const observer = {
      next: (value: number) =>
        this.addConsole('observableObserverSubscription', 'Value -> ' + value), // Handles the emitted values
      error: (err: unknown) => console.log('Error:', err), // Handles the error
      complete: () => this.addConsole('observableObserverSubscription', 'Complete!'), // Handles the completion (No Error)
    };

    // 3. We create the subscription
    this.subscription.add(observable.subscribe(observer));

    // 4. Here you can cancel the subscription if you wish.
    this.subscription.unsubscribe();
  }

  private unsubscribes(): void {
    const subscription = new Subscription();

    const createSubscription = () => {
      this.subscription = interval(1000).subscribe((n: number) =>
        this.addConsole('unsubscribe', n.toString()),
      );
    };

    fromEvent(document.getElementById('btn-click-subscribe')!, 'click').subscribe(() => {
      if (!subscription.closed) subscription.unsubscribe();
      createSubscription();
    });
    fromEvent(document.getElementById('btn-click-unsubscribe')!, 'click').subscribe(() =>
      this.subscription.unsubscribe(),
    );
  }

  private unsubscribesSeveral(): void {
    this.subscription2.add(
      interval(1000).subscribe((n: number) =>
        this.addConsole('unsubscribeSeveral', 'interval 1-> ' + n.toString()),
      ),
    );

    this.subscription2.add(
      interval(500).subscribe((n: number) =>
        this.addConsole('unsubscribeSeveral', 'interval 2-> ' + n.toString()),
      ),
    );

    fromEvent(document.getElementById('btn-click-unsubscribe-all')!, 'click').subscribe(() =>
      this.subscription2.unsubscribe(),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
