import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  delay,
  filter,
  fromEvent,
  interval,
  map,
  of,
  scan,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { IntroductionService } from '../../services/introduction.service';
import { MenuService } from '../../services/menu.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription = new Subscription();
  public showPage: string = 'header__page--hidden';
  public opacity: string = '';
  public title!: any;
  public showUnlock: boolean = true;
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
          const currentUrl = event.urlAfterRedirects;
          console.log(currentUrl);
          if (currentUrl === '/home') {
            this.setTitle(this.translate.instant('unlock'));
            this.showUnlock = true;
          }
        }),
    );

    this.subscription.add;
    this.translate.onLangChange.subscribe(() => {
      if (this.showUnlock) {
        this.setTitle(this.translate.instant('unlock'));
      } else {
        this.setTitle(this.translate.instant(this.introductionService.info.getValue() + '.title'));
      }
    });
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
          if (this.router.url !== '/home')
            if (e >= 110) {
              if (this.showUnlock) {
                this.setTitle(
                  this.translate.instant(this.introductionService.info.getValue() + '.title'),
                );
                this.showUnlock = false;
              }
            } else {
              if (!this.showUnlock) {
                this.setTitle(this.translate.instant('unlock'));
                this.showUnlock = true;
              }
            }
        }),
    );
  }

  private setTitle(title: string): void {
    this.title = of(title).pipe(
      switchMap((t) =>
        interval(25).pipe(
          delay(200),
          take(t.length),
          map((index) => t[index]),
          scan((acc, char) => acc + char, ''),
        ),
      ),
    );
  }

  public showHideMenu(): void {
    this.menuService.openMenu.next(!this.menuService.openMenu.getValue());
  }

  public navigate(category: string, id?: string): void {
    this.menuService.navigate(category, id);
  }
}
