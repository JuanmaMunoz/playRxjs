import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IInfo } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';
import { fadeToggle } from '../../utils/animations';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  animations: [fadeToggle()],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent {
  @Input() info!: IInfo;
  public show = false;
  private menuService = inject(MenuService);

  public showHideList(): void {
    this.show = !this.show;
  }

  public navigate(category: string, id?: string): void {
    this.menuService.openMenu.next(false);
    this.menuService.navigate(category, id);
  }
}
