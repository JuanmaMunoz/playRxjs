import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IInfo } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent {
  @Input() info!: IInfo;
  @ViewChild('list') list!: ElementRef;
  public show = false;
  private menuService = inject(MenuService);

  public showHideList(): void {
    this.show = !this.show;
    this.list.nativeElement.classList.toggle('menu-items__list--show');
    this.list.nativeElement.classList.toggle('menu-items__list--hidden');
  }

  public navigate(category: string, id?: string): void {
    this.menuService.openMenu.next(false);
    this.menuService.navigate(category, id);
  }
}
