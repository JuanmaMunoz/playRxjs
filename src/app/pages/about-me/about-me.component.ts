import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PanelComponent } from '../../components/panel/panel.component';
import { ColorPanel } from '../../models/enums';

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
