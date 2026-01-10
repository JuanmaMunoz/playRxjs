import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, fromEvent, Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Language } from './models/enums';
import { MenuService } from './services/menu.service';
import { showApp } from './utils/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuComponent, HeaderComponent, RouterModule, SpinnerComponent],
  animations: [showApp(500)],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('content') content!: ElementRef;
  private subscription = new Subscription();
  private menuService = inject(MenuService);
  private translate = inject(TranslateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || Language.ENGLISH;
    this.translate.use(lang);
    this.subscription.add(
      this.translate.onLangChange.subscribe((data) => {
        localStorage.setItem('language', data.lang);
      }),
    );

    this.subscription.add(
      fromEvent(document, 'click')
        .pipe(
          filter(
            (e) =>
              !(e.target as HTMLButtonElement).classList.value.includes('menu') &&
              this.menuService.openMenu.getValue(),
          ),
        )
        .subscribe(() => {
          this.menuService.openMenu.next(false);
        }),
    );
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          setTimeout(() => {
            this.resetScroll(event.urlAfterRedirects);
            const id = event.urlAfterRedirects.split('/').pop();
            const target = document.getElementById(`operator-${id}`);
            if (target) {
              const offset = 130;
              const offsetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }, 200);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private resetScroll(url: string): void {
    if (!url.includes('home')) window.scrollTo({ top: 0 });
  }
}
