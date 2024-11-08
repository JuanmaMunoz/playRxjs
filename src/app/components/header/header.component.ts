import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fromEvent, map, Subscription } from 'rxjs';
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
  constructor(
    private menuService: MenuService,
    public introductionService: IntroductionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.subscription.add(
      fromEvent(document, 'scroll')
        .pipe(map(() => window.scrollY))
        .subscribe((e: number) => {
          this.showPage =
            e >= 230 ? 'header__page--show' : 'header__page--hidden';
        }),
    );
  }

  ngOnDestroy(): void {}

  public showHideMenu(): void {
    this.menuService.openMenu.next(!this.menuService.openMenu.getValue());
  }
}
