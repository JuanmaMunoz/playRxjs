import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  delay,
  filter,
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
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public showPage = 'header__page--hidden';
  public opacity = '';
  public title!: Observable<string>;
  private router = inject(Router);
  public introductionService = inject(IntroductionService);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.introductionService.setIntroduction(this.router.url);
    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const currentUrl = event.urlAfterRedirects;
          this.introductionService.setIntroduction(currentUrl);
        }),
    );

    this.subscription.add(
      this.translate.onLangChange.subscribe(() => {
        this.setTitle();
      }),
    );

    this.subscription.add(this.introductionService.info.subscribe(() => this.setTitle()));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setTitle(): void {
    const title = this.translate.instant(this.introductionService.info.getValue() + '.title');
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
}
