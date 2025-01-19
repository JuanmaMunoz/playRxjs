import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPanel } from '../../models/enums';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule, PanelComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  public photo: string = 'assets/images/photo.jpg';
  public colorPanel = ColorPanel;
}
