import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { fromEvent, map, Subscription } from 'rxjs';
import { LogoComponent } from '../../components/logo/logo.component';
import { SectionComponent } from '../../components/section/section.component';
import { basics } from '../../info/basic';
import { combinations } from '../../info/combinations';
import { conditionals } from '../../info/conditionals';
import { creations } from '../../info/creations';
import { errors } from '../../info/errors';
import { filterings } from '../../info/filterings';
import { multicastings } from '../../info/multicastings';
import { subjects } from '../../info/subjects';
import { transformations } from '../../info/transformations';
import { utilitys } from '../../info/utilitys';
import { IInfo } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';
import { mathematicals } from './../../info/mathematicals';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, SectionComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  public image: string = 'assets/images/rxjs.jpg';
  public angular: string = 'assets/images/angular.png';
  public rxjs: string = 'assets/images/rxjs-logo.svg';
  public logoWidth!: number;
  public combinationInfo: IInfo = combinations;
  public conditionalInfo: IInfo = conditionals;
  public transformationInfo: IInfo = transformations;
  public mathematicalInfo: IInfo = mathematicals;
  public multicastingInfo: IInfo = multicastings;
  public creationInfo: IInfo = creations;
  public filteringInfo: IInfo = filterings;
  public utilityInfo: IInfo = utilitys;
  public errorInfo: IInfo = errors;
  public subjectInfo: IInfo = subjects;
  public basicInfo: IInfo = basics;
  private subscription = new Subscription();
  public showOperators: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.setLogoWidth(window.innerWidth);
    this.listenResizeWindow();
    setTimeout(() => (this.showOperators = true), 1);
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

  public navigate(category: string, id?: string): void {
    this.menuService.navigate(category, id);
  }
}
