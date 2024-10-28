import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import {
  concatMap,
  from,
  fromEvent,
  interval,
  map,
  mapTo,
  mergeMap,
  mergeMapTo,
  Observable,
  of,
  range,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { transformations } from '../../info/transformations';
import { UserService } from '../../services/user.service';
import { IInfo, IUser } from './../../models/interfaces';

@Component({
  selector: 'app-transformation1',
  standalone: true,
  imports: [CommonModule, ExampleComponent],
  templateUrl: './transformation1.component.html',
  styleUrl: './transformation1.component.scss',
})
export class Transformation1Component implements OnInit, AfterViewInit {
  public info!: Observable<IInfo[]>;
  constructor(
    private userService: UserService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.info = of(transformations);
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
      );
  }

  private operatorMapTo(): void {
    from(['orange', 'lemon', 'melon'])
      .pipe(mapTo('strawberry'))
      .subscribe((data: string) => this.addConsole('mapTo', data));
  }

  private operatorMergeMap(): void {
    from(['a', 'b', 'c'])
      .pipe(
        mergeMap((e: string) =>
          range(1, 2).pipe(map((n: number) => e + ' + ' + n + ' = ?')),
        ),
      )
      .subscribe((data: string) => this.addConsole('mergeMap', data));
  }

  private operatorMergeMapTo(): void {
    from(['a', 'b', 'c'])
      .pipe(
        mergeMapTo(
          range(1, 2).pipe(
            map((n: number) => 'the same output' + ' + ' + n + ' = ?'),
          ),
        ),
      )
      .subscribe((data: string) => this.addConsole('mergeMapTo', data));
  }

  private operatorSwitchMap(): void {
    fromEvent(document.getElementById('btn-start-sw-map')!, 'click')
      .pipe(
        switchMap((e: any) =>
          interval(1000).pipe(map((n: number) => e.target.className + ' ' + n)),
        ),
        takeUntil(
          fromEvent(document.getElementById('btn-stop-sw-map')!, 'click'),
        ),
      )
      .subscribe((data: string) => this.addConsole('switchMap', data));
  }

  private operatorConcatMap(): void {
    fromEvent(document.getElementById('btn-start-cc-map')!, 'click')
      .pipe(
        concatMap((e: any) =>
          interval(1000).pipe(map((n: number) => e.target.className + ' ' + n)),
        ),
        takeUntil(
          fromEvent(document.getElementById('btn-stop-cc-map')!, 'click'),
        ),
      )
      .subscribe((data: string) => this.addConsole('concatMap', data));
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
