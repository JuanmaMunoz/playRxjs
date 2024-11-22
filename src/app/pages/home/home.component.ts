import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, SectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public image: string = 'assets/images/rxjs.jpg';
  public angular: string = 'assets/images/angular.png';
  public rxjs: string = 'assets/images/rxjs-logo.svg';
}
