import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  filter,
  fromEvent,
  interval,
  map,
  scan,
  Subscription,
  take,
} from 'rxjs';
import { IIntroduction } from '../../models/interfaces';
import { SearchComponent } from '../../search/search.component';
import { IntroductionService } from '../../services/introduction.service';
import { MenuService } from '../../services/menu.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, CommonModule, RouterModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription = new Subscription();
  public showPage: string = 'header__page--hidden';
  public headerBorder: string = '';
  public opacity: string = '';
  public title!: any;
  public showTitle: boolean = false;
  public currentUrl: string = '/';
  constructor(
    private menuService: MenuService,
    private router: Router,
    public introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(
          filter(
            (event): event is NavigationEnd => event instanceof NavigationEnd,
          ),
        )
        .subscribe((event: NavigationEnd) => {
          this.currentUrl = event.urlAfterRedirects;
        }),
    );

    this.subscription.add(
      this.introductionService.info.subscribe((intro: IIntroduction) => {
        this.setTitle(intro.title);
      }),
    );
  }
  ngAfterViewInit(): void {
    this.showHidePage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private showHidePage(): void {
    this.subscription.add(
      fromEvent(document, 'scroll')
        .pipe(map(() => window.scrollY))
        .subscribe((e: number) => {
          if (e >= 200) {
            this.showPage = 'header__page--show';
            this.headerBorder = 'header--border';
            this.opacity = '';
            if (!this.showTitle)
              this.setTitle(this.introductionService.info.getValue().title);
            this.showTitle = true;
          } else {
            this.showTitle = false;
            this.showPage = 'header__page--hidden';
            this.headerBorder = '';
            this.opacity = 'header__container--opacity';
          }
        }),
    );
  }

  private setTitle(title: string): void {
    this.title = interval(25).pipe(
      take(title.length),
      map((index) => title[index]),
      scan((state, c) => state + c),
    );
  }

  public showHideMenu(): void {
    this.menuService.openMenu.next(!this.menuService.openMenu.getValue());
  }
}
