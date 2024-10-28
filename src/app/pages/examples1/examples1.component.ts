import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  fromEvent,
  interval,
  map,
  Observable,
  take,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { IUser } from '../../models/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-examples1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examples1.component.html',
  styleUrl: './examples1.component.scss',
})
export class Examples1Component {
  public obsUsers1!: Observable<string[]>;
  public obsUsers2!: Observable<IUser[]>;

  public obsInterval1!: Observable<string>;
  public obsInterval2!: Observable<number>;
  public obsInterval3!: Observable<number>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.modifyList();
    this.filterList();
    this.intervalTakeWhile();
    this.intervalTakeUntil();
    this.intervalTake();
  }

  private modifyList(): void {
    this.obsUsers1 = this.userService
      .getUsers()
      .pipe(map((e) => e.map((i) => i.name + ' ' + i.firstName)));
  }

  private filterList(): void {
    this.obsUsers2 = this.userService
      .getUsers()
      .pipe(
        map((users) => users.filter((e) => e.salary > 30000 && e.age > 39))
      );
  }

  private intervalTakeWhile(): void {
    this.obsInterval1 = interval(1000).pipe(
      takeWhile((e) => e <= 5),
      map((e) => `step ${e} of interval`)
    );
  }

  private intervalTakeUntil(): void {
    const click = fromEvent(document.getElementById('btn')!, 'click');
    this.obsInterval2 = interval(1000).pipe(takeUntil(click));
  }

  private intervalTake(): void {
    this.obsInterval3 = interval(1000).pipe(take(10));
  }
}
