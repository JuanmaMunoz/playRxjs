import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IMenuItems } from '../models/interfaces';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent {
  @Input() menuItems!: Observable<IMenuItems>;
  @ViewChild('list') list!: ElementRef;
  public show: boolean = false;

  constructor(
    private router: Router,
    private menuService: MenuService,
  ) {}

  public showHideList(): void {
    this.show = !this.show;
    this.list.nativeElement.classList.toggle('menu-items__list--show');
    this.list.nativeElement.classList.toggle('menu-items__list--hidden');
  }

  public navigate(category: string, id: string): void {
    this.menuService.openMenu.next(false);
    this.router.navigate([`/${category}/${id}`]);
  }
}
