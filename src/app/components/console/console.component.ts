import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss',
})
export class ConsoleComponent {
  @Input() id!: string;

  constructor(private render: Renderer2) {}

  public clearConsole(): void {
    console.log('console-' + this.id);
    const container = document.getElementById('console-' + this.id);
    this.render.setProperty(container, 'innerHTML', '');
  }
}
