import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  delay,
  filter,
  fromEvent,
  interval,
  map,
  Observable,
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
  public showPage = 'header__page--hidden';
  public opacity = '';
  public title!: Observable<string>;
  public showUnlock = true;
  public logoWidth = 110;
  private menuService = inject(MenuService);
  private router = inject(Router);
  public introductionService = inject(IntroductionService);
  private translate = inject(TranslateService);

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

    this.subscription.add(
      this.translate.onLangChange.subscribe(() => {
        if (this.showUnlock) {
          this.setTitle(this.translate.instant('unlock'));
        } else {
          this.setTitle(
            this.translate.instant(this.introductionService.info.getValue() + '.title'),
          );
        }
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
      fromEvent(window, 'scroll')
        .pipe(map(() => document.scrollingElement?.scrollTop || 0))
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
