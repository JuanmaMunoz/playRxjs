import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../../search/search.component';
import { MenuService } from '../../services/menu.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, CommonModule, RouterModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private menuService: MenuService) {}

  public showHideMenu(): void {
    this.menuService.openMenu.next(!this.menuService.openMenu.getValue());
  }
}
