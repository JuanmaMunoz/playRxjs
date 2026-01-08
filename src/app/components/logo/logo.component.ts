import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() width = 350;
  @Input() borderWidth = 5;
  public image = 'assets/images/rxjs.jpg';
}
