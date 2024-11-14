import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fromEvent, interval, map, scan, Subscription, take, tap } from 'rxjs';
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
  public opacity: string = '';
  public title!: any;
  public showTitle: boolean = false;
  constructor(
    private menuService: MenuService,
    public introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
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
          if (e >= 250) {
            this.showPage = 'header__page--show';
            this.opacity = '';
            if (!this.showTitle)
              this.setTitle(this.introductionService.info.getValue().title);
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
    this.title = interval(50).pipe(
      take(title.length),
      map((index) => title[index]),
      tap((e) => console.log(e)),
      scan((text, character) => text + character),
    );
  }

  public showHideMenu(): void {
    this.menuService.openMenu.next(!this.menuService.openMenu.getValue());
  }
}
