import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  concatMap,
  delay,
  exhaustMap,
  expand,
  from,
  fromEvent,
  groupBy,
  interval,
  map,
  mapTo,
  mergeMap,
  mergeMapTo,
  mergeScan,
  of,
  pairwise,
  partition,
  pluck,
  range,
  scan,
  Subscription,
  switchMap,
  take,
  toArray,
  window,
  windowCount,
  windowTime,
  windowToggle,
  windowWhen,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { transformations } from '../../info/transformations';
import { IInfo, IUser } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-transformation',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './transformation.component.html',
  styleUrl: './transformation.component.scss',
})
export class TransformationComponent implements OnInit, AfterViewInit {
  public info!: IInfo;
  public subscription = new Subscription();

  constructor(
    private userService: UserService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
    this.info = transformations;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorBuffer();
    this.operatorBufferCount();
    this.operatorBufferTime();
    this.operatorBufferToogle();
    this.operatorBufferWhen();
    this.operatorConcatMap();
    this.operatorExhaustMap();
    this.operatorExpand();
    this.operatorGroupBy();
    this.operatorMap();
    this.operatorMapTo();
    this.operatorMergeMap();
    this.operatorMergeMapTo();
    this.operatorMergeScan();
    this.operatorPairWise();
    this.operatorPartition();
    this.operatorPluck();
    this.operatorScan();
    this.operatorSwitchMap();
    this.operatorWindow();
    this.operatorWindowCount();
    this.operatorWindowTime();
    this.operatorWindowToogle();
    this.operatorWindowWhen();
  }

  private operatorBuffer(): void {
    const click$ = fromEvent(document.getElementById('btn-click-buffer')!, 'click');
    const triger$ = interval(3000);
    this.subscription.add(
      click$
        .pipe(buffer(triger$))
        .subscribe((clicks: Event[]) => this.addConsole('buffer', clicks.length.toString())),
    );
  }

  private operatorBufferCount(): void {
    const click$ = fromEvent(document.getElementById('btn-click-buffer-count')!, 'click');
    this.subscription.add(
      click$
        .pipe(bufferCount(5))
        .subscribe((clicks: Event[]) => this.addConsole('bufferCount', '5 clicks')),
    );
  }

  private operatorBufferTime(): void {
    const interval$ = interval(1000);
    this.subscription.add(
      interval$
        .pipe(bufferTime(3000))
        .subscribe((n: number[]) => this.addConsole('bufferTime', `[${n.toString()}]`)),
    );
  }

  private operatorBufferToogle(): void {
    const start$ = fromEvent(document.getElementById('btn-click-buffer-toogle-start')!, 'click');
    const stop$ = () =>
      fromEvent(document.getElementById('btn-click-buffer-toogle-stop')!, 'click');
    const interval$ = interval(1000);
    this.subscription.add(
      interval$
        .pipe(bufferToggle(start$, stop$))
        .subscribe((n: number[]) => this.addConsole('bufferToogle', `[${n.toString()}]`)),
    );
  }

  private operatorBufferWhen(): void {
    const interval$ = interval(1000);
    const click$ = fromEvent(document.getElementById('btn-click-buffer-when')!, 'click');
    this.subscription.add(
      interval$
        .pipe(bufferWhen(() => click$))
        .subscribe((n: number[]) => this.addConsole('bufferWhen', `[${n.toString()}]`)),
    );
  }

  private operatorConcatMap(): void {
    this.subscription.add(
      fromEvent(document.getElementById('btn-start-cc-map')!, 'click')
        .pipe(concatMap((e: any) => interval(1000).pipe(map((n: number) => e.target.id + ' ' + n))))
        .subscribe((data: string) => this.addConsole('concatMap', data)),
    );
  }

  private operatorExhaustMap(): void {
    this.subscription.add(
      fromEvent(document.getElementById('btn-start-exhaust-map')!, 'click')
        .pipe(
          delay(5000),
          exhaustMap(() => this.userService.getUsers()),
        )
        .subscribe((data: IUser[]) => this.addConsole('exhaustMap', JSON.stringify(data))),
    );
  }

  private operatorExpand(): void {
    this.subscription.add(
      of(1)
        .pipe(
          expand((x) => of(x + 10)),
          take(5),
        )
        .subscribe((x: number) => this.addConsole('expand', x.toString())),
    );
  }

  private operatorGroupBy(): void {
    const animals$ = from([
      { name: 'Rufy', species: 'cat' },
      { name: 'Benito', species: 'dog' },
      { name: 'Mini', species: 'cat' },
      { name: 'Pedro', species: 'dog' },
    ]);

    const species$ = animals$.pipe(
      groupBy(({ species }) => species),
      mergeMap((species) => species.pipe(toArray())),
    );
    species$.subscribe((species) => this.addConsole('groupBy', JSON.stringify(species)));
  }

  private operatorMergeScan(): void {
    this.subscription.add(
      of(1, 10, 20)
        .pipe(
          mergeScan((acc: number, value: number) => {
            return of(acc + value);
          }, 0), // The accumulator starts at 0.
        )
        .subscribe((result: number) => this.addConsole('mergeScan', JSON.stringify(result))),
    );
  }

  private operatorPairWise(): void {
    this.subscription.add(
      of(1, 10, 20)
        .pipe(pairwise())
        .subscribe((result: number[]) => this.addConsole('pairwise', JSON.stringify(result))),
    );
  }

  private operatorPartition(): void {
    const animals$ = from([
      { name: 'Rufy', species: 'cat' },
      { name: 'Benito', species: 'dog' },
      { name: 'Mini', species: 'cat' },
      { name: 'Pedro', species: 'dog' },
      { name: 'Marc', species: 'monkey' },
    ]);
    const [cats$, others$] = partition(animals$, ({ species }) => species === 'cat');
    this.subscription.add(
      cats$.subscribe((cats) => this.addConsole('partition', JSON.stringify(cats))),
    );
  }

  private operatorPluck(): void {
    const animals$ = from([
      { name: 'Rufy', species: 'cat' },
      { name: 'Benito', species: 'dog' },
      { name: 'Mini', species: 'cat' },
      { name: 'Pedro', species: 'dog' },
    ]);
    this.subscription.add(
      animals$
        .pipe(pluck('name'))
        .subscribe((name: string) => this.addConsole('pluck', JSON.stringify(name))),
    );
  }

  private operatorScan(): void {
    this.subscription.add(
      of(1, 10, 20)
        .pipe(scan((acc: number, value: number) => acc + value))
        .subscribe((result: number) => this.addConsole('scan', JSON.stringify(result))),
    );
  }

  private operatorMap(): void {
    this.subscription.add(
      this.userService
        .getUsers()
        .pipe(
          map((e: IUser[]) =>
            e.map((u: IUser) => ({
              ...u,
              name: u.name + ' ****--****',
            })),
          ),
        )
        .subscribe((data: IUser[]) => this.addConsole('map', JSON.stringify(data))),
    );
  }

  private operatorMapTo(): void {
    this.subscription.add(
      from(['orange', 'lemon', 'melon'])
        .pipe(mapTo('strawberry'))
        .subscribe((data: string) => this.addConsole('mapTo', data)),
    );
  }

  private operatorMergeMap(): void {
    this.subscription.add(
      from(['a', 'b', 'c'])
        .pipe(mergeMap((e: string) => range(1, 2).pipe(map((n: number) => e + ' + ' + n + ' = ?'))))
        .subscribe((data: string) => this.addConsole('mergeMap', data)),
    );
  }

  private operatorMergeMapTo(): void {
    this.subscription.add(
      from(['a', 'b', 'c'])
        .pipe(
          mergeMapTo(range(1, 2).pipe(map((n: number) => 'the same output' + ' + ' + n + ' = ?'))),
        )
        .subscribe((data: string) => this.addConsole('mergeMapTo', data)),
    );
  }

  private operatorSwitchMap(): void {
    this.subscription.add(
      fromEvent(document.getElementById('btn-start-sw-map')!, 'click')
        .pipe(switchMap((e: any) => interval(1000).pipe(map((n: number) => e.target.id + ' ' + n))))
        .subscribe((data: string) => this.addConsole('switchMap', data)),
    );
  }

  private operatorWindow(): void {
    const source$ = interval(1000);
    const closingNotifier$ = interval(3000);
    this.subscription.add(
      source$
        .pipe(
          window(closingNotifier$),
          mergeMap((window$) => window$.pipe(toArray())),
        )
        .subscribe((data: number[]) => this.addConsole('window', JSON.stringify(data))),
    );
  }

  private operatorWindowCount(): void {
    const source$ = of(1, 2, 3, 4, 5, 6);
    this.subscription.add(
      source$
        .pipe(
          windowCount(3, 2), // Windows of 3 elements, starting every 2 values
          mergeMap((window$) => window$.pipe(toArray())),
        )
        .subscribe((data: number[]) => this.addConsole('windowCount', JSON.stringify(data))),
    );
  }

  private operatorWindowTime(): void {
    const source$ = interval(1000);
    this.subscription.add(
      source$
        .pipe(
          windowTime(3000),
          mergeMap((window$) => window$.pipe(toArray())),
        )
        .subscribe((data: number[]) => this.addConsole('windowTime', JSON.stringify(data))),
    );
  }

  private operatorWindowToogle(): void {
    const source$ = interval(1000);
    const openings$ = interval(5000);
    const closings = () => interval(3000);
    this.subscription.add(
      source$
        .pipe(
          windowToggle(openings$, closings),
          mergeMap((window$) => window$.pipe(toArray())),
        )
        .subscribe((data: number[]) => this.addConsole('windowToogle', JSON.stringify(data))),
    );
  }

  private operatorWindowWhen(): void {
    const source$ = interval(1000);
    this.subscription.add(
      source$
        .pipe(
          windowWhen(() => interval(3000)),
          mergeMap((window$) => window$.pipe(toArray())),
        )
        .subscribe((data: number[]) => this.addConsole('windowWhen', JSON.stringify(data))),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
