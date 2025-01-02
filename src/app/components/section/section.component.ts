import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IInfo } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() info!: IInfo;

  constructor(private menuService: MenuService) {}

  public navigate(category: string, id?: string): void {
    this.menuService.navigate(category, id);
  }
}
