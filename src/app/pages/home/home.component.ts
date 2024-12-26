import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, Subscription } from 'rxjs';
import { LogoComponent } from '../../components/logo/logo.component';
import { SectionComponent } from '../../components/section/section.component';
import { combinations } from '../../info/combinations';
import { transformations } from '../../info/transformations';
import { IInfo } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, SectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  public image: string = 'assets/images/rxjs.jpg';
  public angular: string = 'assets/images/angular.png';
  public rxjs: string = 'assets/images/rxjs-logo.svg';
  public logoWidth!: number;
  public combinationInfo: IInfo = combinations;
  public transformationInfo: IInfo = transformations;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.setLogoWidth(window.innerWidth);
    this.listenResizeWindow();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private listenResizeWindow(): void {
    this.subscription.add(
      fromEvent(window, 'resize')
        .pipe(map(() => window.innerWidth))
        .subscribe((width: number) => this.setLogoWidth(width)),
    );
  }

  private setLogoWidth(width: number): void {
    if (width > 668) {
      this.logoWidth = width < 992 ? width / 3 : 350;
    } else {
      this.logoWidth = width / 1.5;
    }
  }
}
