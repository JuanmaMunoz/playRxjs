import { Component, Input, Renderer2 } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss',
})
export class ConsoleComponent {
  @Input() id!: string;

  constructor(private render: Renderer2) {}

  public clearConsole(): void {
    const container = document.getElementById('console-' + this.id);
    this.render.setProperty(container, 'innerHTML', '');
  }
}
