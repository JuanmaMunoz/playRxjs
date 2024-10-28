import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  combineLatest,
  concatMap,
  forkJoin,
  fromEvent,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { IHobby, IUser } from '../../models/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-examples4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examples4.component.html',
  styleUrl: './examples4.component.scss',
})
export class Examples4Component {
  public isChecked!: Observable<boolean>;
  public isChecked2!: Observable<boolean>;
  public isAllChecked!: Observable<boolean>;
  public obsUsers!: Observable<IUser[]>;
  public obsUserAndHoobies!: Observable<IUser[]>;
  public obsUsers2!: Observable<IUser>;
  public obsUserAndHoobies2!: Observable<IUser>;
  public obsUserAndHoobies3!: Observable<IUser>;
  public obsUserAndHoobies4!: Observable<IUser[]>;
  public obsHobbies!: Observable<IHobby[]>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.forkJoinAndConcatObs();
    this.isCheckedInputs();
    this.filterUserAndHobbies();
    this.filterOnlyConcatMapObserver();
    this.allonlyConcatMapObserver();
  }

  private forkJoinAndConcatObs(): void {
    this.obsUsers = this.userService.getUsers();
    this.obsHobbies = this.userService.gethobbies();
    this.obsUserAndHoobies = forkJoin([this.obsUsers, this.obsHobbies]).pipe(
      concatMap(([u, h]: [IUser[], IHobby[]]) => {
        return of({ users: u, hoobies: h }).pipe(
          map((e: { users: IUser[]; hoobies: IHobby[] }) =>
            e.users.map((o: IUser) => ({
              ...o,
              hobbies: e.hoobies.find((i) => i.name === o.name)?.hobbies,
            }))
          )
        );
      })
    );
  }

  private filterUserAndHobbies(): void {
    this.obsUsers2 = this.userService
      .getUsers()
      .pipe(
        concatMap((e: IUser[]) => e.filter((e: IUser) => e.name === 'Juanma'))
      );
    this.obsUserAndHoobies2 = forkJoin([this.obsUsers2, this.obsHobbies]).pipe(
      concatMap(([user, hobbies]) => {
        return of({
          ...user,
          hobbies: hobbies.find((e) => e.name === user.name)?.hobbies,
        });
      })
    );
  }

  private filterOnlyConcatMapObserver(): void {
    this.obsUserAndHoobies3 = this.obsUsers2.pipe(
      concatMap((e: IUser) =>
        this.obsHobbies.pipe(
          map((h) => {
            return { ...e, hobbies: h.find((i) => i.name === e.name)?.hobbies };
          })
        )
      )
    );
  }

  private allonlyConcatMapObserver(): void {
    this.obsUserAndHoobies4 = this.userService.getUsers().pipe(
      concatMap((users: IUser[]) => {
        return forkJoin([of(users), this.obsHobbies]).pipe(
          map(([users, hobbies]) =>
            users.map((user) => ({
              ...user,
              hobbies: hobbies.find((hobby) => hobby.name === user.name)!
                .hobbies,
            }))
          )
        );
      })
    );
  }

  private isCheckedInputs(): void {
    this.isChecked = fromEvent(
      document.getElementById('check1')!,
      'change'
    ).pipe(map((e: any) => e.target!.checked));

    this.isChecked2 = fromEvent(
      document.getElementById('check2')!,
      'change'
    ).pipe(map((e: any) => e.target!.checked));

    this.isAllChecked = combineLatest([this.isChecked, this.isChecked2]).pipe(
      map(([e, i]) => e && i),
      tap((e) => console.log(e))
    );
  }
}
