import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  concatMap,
  fromEvent,
  interval,
  map,
  mergeAll,
  mergeMap,
  Observable,
  switchMap,
  takeUntil,
} from 'rxjs';
import { IUser } from '../../models/interfaces';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-examples3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examples3.component.html',
  styleUrl: './examples3.component.scss',
})
export class Examples3Component {
  public obsUsers1!: Observable<IUser[]>;
  public resultConsole1: number = 0;
  public resultConsole2: number = 0;
  public resultConsole3: number = 0;
  public resultConsole4: number = 0;

  constructor(private usersService: UserService) {}
  ngOnInit(): void {
    this.mergeAllclickAndInterval();
    this.mergeMapclickAndInterval();
    this.switchMapclickAndInterval();
    this.concatMapclickAndInterval();
  }

  private mergeAllclickAndInterval(): void {
    const clicks = fromEvent(document.getElementById('start')!, 'click').pipe(
      map(() => interval(1000)),
      mergeAll(),
      takeUntil(fromEvent(document.getElementById('stop')!, 'click'))
    );
    clicks.subscribe((x) => {
      this.resultConsole1 = x;
      console.log('mergeAll->', this.resultConsole1);
    });
  }

  private mergeMapclickAndInterval(): void {
    const clicks = fromEvent(document.getElementById('start2')!, 'click').pipe(
      mergeMap(() => interval(1000)),
      takeUntil(fromEvent(document.getElementById('stop2')!, 'click'))
    );
    clicks.subscribe((x) => {
      this.resultConsole2 = x;
      console.log('mergeMap->', this.resultConsole2);
    });
  }

  private switchMapclickAndInterval(): void {
    const clicks = fromEvent(document.getElementById('start3')!, 'click').pipe(
      switchMap(() => interval(1000)),
      takeUntil(fromEvent(document.getElementById('stop3')!, 'click'))
    );
    clicks.subscribe((x) => {
      this.resultConsole3 = x;
      console.log('switchMap->', this.resultConsole3);
    });
  }

  private concatMapclickAndInterval(): void {
    const clicks = fromEvent(document.getElementById('start4')!, 'click').pipe(
      concatMap(() => interval(1000)),
      takeUntil(fromEvent(document.getElementById('stop4')!, 'click'))
    );
    clicks.subscribe((x) => {
      this.resultConsole4 = x;
      console.log('concatMap->', this.resultConsole4);
    });
  }
}
