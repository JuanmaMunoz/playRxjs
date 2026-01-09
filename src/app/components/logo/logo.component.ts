import { AfterViewInit, Component, Input } from '@angular/core';
import { show, spin } from '../../utils/animations';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  animations: [show(500), spin()],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent implements AfterViewInit {
  @Input() width = 350;
  @Input() borderWidth = 5;
  public image = 'assets/images/rxjs.jpg';
  public showLogo = false;
  state: 'a' | 'b' = 'a';

  ngAfterViewInit() {
    queueMicrotask(() => (this.showLogo = true));
  }

  toggle() {
    this.state = this.state === 'a' ? 'b' : 'a';
  }
}
