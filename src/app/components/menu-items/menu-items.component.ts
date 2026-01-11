import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IInfo } from '../../models/interfaces';
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

  public showHideList(): void {
    this.show = !this.show;
  }
}
