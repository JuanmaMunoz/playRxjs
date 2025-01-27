import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter, fromEvent, interval, map, scan, Subscription, take } from 'rxjs';
import { IntroductionService } from '../../services/introduction.service';
import { MenuService } from '../../services/menu.service';
import { LogoComponent } from '../logo/logo.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, CommonModule, RouterModule, SearchComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription = new Subscription();
  public showPage: string = 'header__page--hidden';
  public opacity: string = '';
  public title!: any;
  public showTitle: boolean = false;
  public currentUrl: string = '/';
  public logoWidth: number = 110;
  constructor(
    private menuService: MenuService,
    private router: Router,
    public introductionService: IntroductionService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.currentUrl = event.urlAfterRedirects;
        }),
    );

    this.subscription.add(
      this.introductionService.info.subscribe((title: string) => {
        this.setTitle(this.translate.instant(this.introductionService.info.getValue() + '.title'));
      }),
    );

    this.subscription.add(
      this.translate.onLangChange.subscribe(() =>
        this.setTitle(this.translate.instant(this.introductionService.info.getValue() + '.title')),
      ),
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
          if (e >= 140 && this.router.url !== '/home') {
            this.showPage = 'header__page--show';
            this.opacity = '';
            if (!this.showTitle) {
              this.setTitle(
                this.translate.instant(this.introductionService.info.getValue() + '.title'),
              );
            }
            this.showTitle = true;
          } else {
            this.showTitle = false;
            this.showPage = 'header__page--hidden';
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

  public navigate(category: string, id?: string): void {
    this.menuService.navigate(category, id);
  }
}
