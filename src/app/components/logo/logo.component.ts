import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() width: number = 350;
  @Input() borderWidth: number = 5;
  public image: string = 'assets/images/rxjs.jpg';
}
