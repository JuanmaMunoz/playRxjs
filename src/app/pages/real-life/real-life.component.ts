import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, delay, filter, forkJoin, map, mergeMap, of, Subscription, toArray } from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { realLife } from '../../info/realLife';
import { IInfo, IUser } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';
import { UserService } from '../../services/user.service';
import { IHobby } from './../../models/interfaces';

@Component({
  selector: 'app-real-life',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './real-life.component.html',
  styleUrl: './real-life.component.scss',
})
export class RealLifeComponent implements OnInit, AfterViewInit {
  public info!: IInfo;
  public subscription = new Subscription();

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private introductionService: IntroductionService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.info = realLife;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.filterUsersMap();
    this.filterUsersMergeMapFilter();
    this.mergeUsersHobbiesforkJoinConcatMap();
    this.filterAndmergeUsersHobbies();
  }

  private filterUsersMap(): void {
    this.subscription.add(
      this.userService
        .getUsers()
        .pipe(map((users: IUser[]) => users.filter((u: IUser) => u.salary >= 30000 && u.age > 39)))
        .subscribe((users: IUser[]) => this.addConsole('filterUsersMap', JSON.stringify(users))),
    );
  }

  private filterUsersMergeMapFilter(): void {
    this.subscription.add(
      this.userService
        .getUsers()
        .pipe(
          mergeMap((users: IUser[]) => users), // Emit individual users
          filter((u: IUser) => u.salary >= 30000 && u.age > 39),
          toArray(),
        )
        .subscribe((users: IUser[]) =>
          this.addConsole('filterUsersMergeMapFilter', JSON.stringify(users)),
        ),
    );
  }

  private mergeUsersHobbiesforkJoinConcatMap(): void {
    const users$ = this.userService.getUsers().pipe(delay(2000));
    const hobbies$ = this.userService.gethobbies();
    this.subscription.add(
      forkJoin(users$, hobbies$)
        .pipe(
          concatMap(([u, h]: [IUser[], IHobby[]]) => {
            return of({ users: u, hobbies: h }).pipe(
              map((data: { users: IUser[]; hobbies: IHobby[] }) =>
                data.users.map((user: IUser) => ({
                  ...user,
                  hobbies: data.hobbies.find((hobby: IHobby) => hobby.name === user.name)?.hobbies,
                })),
              ),
            );
          }),
        )
        .subscribe((usersWithHobbies) =>
          this.addConsole('mergeUsersHobbiesforkJoinConcatMap', JSON.stringify(usersWithHobbies)),
        ),
    );
  }

  private filterAndmergeUsersHobbies(): void {
    const user$ = this.userService.getUsers().pipe(
      map((users: IUser[]) => users.find((u: IUser) => u.name === 'Jhon')),
      delay(2000),
    );
    const hobbies$ = this.userService.gethobbies();
    this.subscription.add(
      forkJoin(user$, hobbies$)
        .pipe(
          map(([u, h]: [IUser | undefined, IHobby[]]) => ({
            ...u,
            hobbies: h.find((hobby: IHobby) => hobby.name === u?.name),
          })),
        )
        .subscribe((data) => this.addConsole('filterAndmergeUsersHobbies', JSON.stringify(data))),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
