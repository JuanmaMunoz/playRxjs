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
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Language } from './models/enums';
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
  private translate = inject(TranslateService);
  private router = inject(Router);
  private timer = 500;

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || Language.ENGLISH;
    this.translate.use(lang);
    this.subscription.add(
      this.translate.onLangChange.subscribe((data) => {
        localStorage.setItem('language', data.lang);
      }),
    );
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.handleNavigationEnd(event);
        }
      }),
    );
  }

  private handleNavigationEnd(event: NavigationEnd): void {
    setTimeout(() => {
      const id = event.urlAfterRedirects.split('/').pop();
      const target = document.getElementById(`operator-${id}`);
      if (target) {
        const offset = 130;
        const offsetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      this.timer = 200;
    }, this.timer);
  }

  private scrollToElement(element: HTMLElement): void {
    const offset = 130;
    const offsetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
