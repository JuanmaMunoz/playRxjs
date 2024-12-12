import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  concatMap,
  from,
  fromEvent,
  interval,
  map,
  mapTo,
  mergeMap,
  mergeMapTo,
  range,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { transformations } from '../../info/transformations';
import { IntroductionComponent } from '../../introduction/introduction.component';
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
    const url =
      '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorMap();
    this.operatorMapTo();
    this.operatorMergeMap();
    this.operatorSwitchMap();
    this.operatorMergeMapTo();
    this.operatorConcatMap();
  }

  private operatorMap(): void {
    this.subscription.add(
      this.userService
        .getUsers()
        .pipe(
          map((e: IUser[]) =>
            e.map((u: IUser) => ({
              ...u,
              name: u.name + ' de todos los santos',
            })),
          ),
        )
        .subscribe((data: IUser[]) =>
          this.addConsole('map', JSON.stringify(data)),
        ),
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
        .pipe(
          mergeMap((e: string) =>
            range(1, 2).pipe(map((n: number) => e + ' + ' + n + ' = ?')),
          ),
        )
        .subscribe((data: string) => this.addConsole('mergeMap', data)),
    );
  }

  private operatorMergeMapTo(): void {
    this.subscription.add(
      from(['a', 'b', 'c'])
        .pipe(
          mergeMapTo(
            range(1, 2).pipe(
              map((n: number) => 'the same output' + ' + ' + n + ' = ?'),
            ),
          ),
        )
        .subscribe((data: string) => this.addConsole('mergeMapTo', data)),
    );
  }

  private operatorSwitchMap(): void {
    this.subscription.add(
      fromEvent(document.getElementById('btn-start-sw-map')!, 'click')
        .pipe(
          switchMap((e: any) =>
            interval(1000).pipe(
              map((n: number) => e.target.className + ' ' + n),
            ),
          ),
          takeUntil(
            fromEvent(document.getElementById('btn-stop-sw-map')!, 'click'),
          ),
        )
        .subscribe((data: string) => this.addConsole('switchMap', data)),
    );
  }

  private operatorConcatMap(): void {
    this.subscription.add(
      fromEvent(document.getElementById('btn-start-cc-map')!, 'click')
        .pipe(
          concatMap((e: any) =>
            interval(1000).pipe(
              map((n: number) => e.target.className + ' ' + n),
            ),
          ),
          takeUntil(
            fromEvent(document.getElementById('btn-stop-cc-map')!, 'click'),
          ),
        )
        .subscribe((data: string) => this.addConsole('concatMap', data)),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
