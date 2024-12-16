import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IInfo } from '../../models/interfaces';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() info!: IInfo;
}
