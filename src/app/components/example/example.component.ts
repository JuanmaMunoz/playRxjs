import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IInfoItem } from '../../models/interfaces';
import { ConsoleComponent } from '../console/console.component';
declare var Prism: any;
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ConsoleComponent, TranslateModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent implements OnInit, AfterViewInit {
  @Input() infoItem!: IInfoItem;
  @Input() category!: string;
  public title!: string;
  public description!: string;
  ngOnInit(): void {
    this.title = `${this.category}.${this.infoItem.id}.title`;
    this.description = `${this.category}.${this.infoItem.id}.description`;
  }

  ngAfterViewInit(): void {
    Prism.highlightAll();
  }
}
