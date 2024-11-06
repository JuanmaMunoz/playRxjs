import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, fromEvent, Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'playRxjs';
  private subscrition = new Subscription();
  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    this.subscrition.add(
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
          console.log(e);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }
}
