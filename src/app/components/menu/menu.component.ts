import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { transformations } from '../../info/transformations';
import { MenuItemsComponent } from '../../menu-items/menu-items.component';
import { IMenuItems } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuItemsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('menu') menu!: ElementRef;
  public menuItems: Observable<IMenuItems> = of({
    title: 'Transformation operators',
    items: transformations,
  });
  private subscription = new Subscription();
  constructor(private menuService: MenuService) {}
  ngAfterViewInit(): void {
    this.subscription.add(
      this.menuService.openMenu.subscribe((open: boolean) => {
        console.log('open->', open);
        this.menu.nativeElement.classList.toggle('menu--show');
        this.menu.nativeElement.classList.toggle('menu--hidden');
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
