import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPanel } from './../../models/enums';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  @Input() color: ColorPanel = ColorPanel.PRIMARY;
  @Input() title = '';
}
