import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IInfo } from '../../models/interfaces';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
export class IntroductionComponent {
  @Input() info!: IInfo;
}
