import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  interval,
  ReplaySubject,
  Subject,
  Subscription,
  take,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { subjects } from '../../info/subjects';
import { IInfo } from '../../models/interfaces';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  public info!: IInfo;
  public subscription = new Subscription();

  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.info = subjects;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorBehaviorSubject();
    this.operatorReplaysubject();
    this.operatorsubject();
  }

  private operatorBehaviorSubject(): void {
    const user$ = new BehaviorSubject<{ name: string; age: number }>({
      name: 'Jhon',
      age: 40,
    });

    const click$ = fromEvent(document.getElementById('btn-click-behavior')!, 'click');
    this.subscription.add(
      click$.subscribe(() => user$.next({ ...user$.getValue(), age: user$.getValue().age + 1 })),
    );

    this.addConsole('behaviorSubject', 'getValue() -> ' + JSON.stringify(user$.getValue()));
    this.subscription.add(
      user$.subscribe((user: { name: string; age: number }) =>
        this.addConsole('behaviorSubject', 'subscribe -> ' + JSON.stringify(user)),
      ),
    );
  }

  private operatorReplaysubject(): void {
    const replay$ = new ReplaySubject<number>(2);
    const interval$ = interval(1000).pipe(take(5));
    this.subscription.add(interval$.subscribe((n: number) => replay$.next(n)));
    setTimeout(() => {
      this.subscription.add(
        replay$.subscribe((n: number) =>
          this.addConsole('replaySubject', 'subscribe -> ' + JSON.stringify(n)),
        ),
      );
    }, 5000);
  }

  private operatorsubject(): void {
    let user: { name: string; age: number } | null = null;
    const user$ = new Subject<{ name: string; age: number }>();

    const click$ = fromEvent(document.getElementById('btn-click-subject')!, 'click');
    this.subscription.add(
      click$.subscribe(() => {
        user = !user ? { name: 'Jhon', age: 40 } : { ...user, age: user!.age + 1 };
        user$.next(user);
      }),
    );
    this.subscription.add(
      user$.subscribe((user: { name: string; age: number }) =>
        this.addConsole('subject', 'subscribe -> ' + JSON.stringify(user)),
      ),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
