import { AfterViewInit, Component, Input } from '@angular/core';
import { show, spin } from '../../utils/animations';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  animations: [show(500), spin(500)],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent implements AfterViewInit {
  @Input() width = 350;
  @Input() borderWidth = 5;
  public image = 'assets/images/rxjs.jpg';
  public showLogo = false;
  public state: 'a' | 'b' = 'a';
  params = this.randomParams();

  ngAfterViewInit() {
    queueMicrotask(() => (this.showLogo = true));
  }

  next() {
    this.state = this.state === 'a' ? 'b' : 'a';
    this.params = this.randomParams();
  }

  randomParams() {
    const size = (Math.random() * 1.5 + 0.5).toFixed(2);

    const primary = 'var(--primary-color)';
    const secondary = 'var(--secondary-color)';

    const swap = Math.random() > 0.5;

    return {
      // 🔁 alternancia de bordes
      borderA: swap ? primary : secondary,
      borderB: swap ? secondary : primary,

      // ✨ chispa
      spark: `0 0 ${size}rem ${swap ? primary : secondary}`,
      opacity: Math.random() * 0.6 + 0.3,
    };
  }
}
