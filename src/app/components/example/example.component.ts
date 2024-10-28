import { AfterViewInit, Component, Input } from '@angular/core';
import { IInfo } from '../../models/interfaces';
import { ConsoleComponent } from '../console/console.component';
declare var Prism: any;
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ConsoleComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent implements AfterViewInit {
  @Input() info!: IInfo;

  ngAfterViewInit(): void {
    Prism.highlightAll();
  }
}
