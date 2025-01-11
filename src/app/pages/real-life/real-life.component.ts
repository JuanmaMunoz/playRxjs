import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, Subscription, toArray } from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { realLife } from '../../info/realLife';
import { IInfo, IUser } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';
import { UserService } from '../../services/user.service';

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

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
