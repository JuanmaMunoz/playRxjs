import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { filter, fromEvent, Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuComponent, HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  public currentUrl = '/';
  private subscription = new Subscription();
  constructor(
    private menuService: MenuService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.subscription.add(
      fromEvent(document, 'click')
        .pipe(
          filter(
            (e: any) =>
              !e.target.classList.value.includes('menu') &&
              this.menuService.openMenu.getValue(),
          ),
        )
        .subscribe((e) => {
          this.menuService.openMenu.next(false);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
