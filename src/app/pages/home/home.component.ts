import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { fromEvent, map, Subscription } from 'rxjs';
import { AboutMeComponent } from '../../components/about-me/about-me.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { PanelComponent } from '../../components/panel/panel.component';
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
import { ColorPanel } from '../../models/enums';
import { IInfo } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';
import { mathematicals } from './../../info/mathematicals';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, SectionComponent, TranslateModule, PanelComponent, AboutMeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public image: string = 'assets/images/rxjs.jpg';
  public angular: string = 'assets/images/angular.png';
  public rxjs: string = 'assets/images/rxjs-logo.png';
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
  public colorPanel = ColorPanel;
  public timeScroll = 60000;
  public hightScroll = 0;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.setLogoWidth(window.innerWidth);
    this.listenResizeWindow();
    setTimeout(() => (this.showOperators = true), 1);
  }

  ngOnDestroy(): void {
    this.setScrollHome(this.hightScroll);
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setPositionScrollHome(), 1);
  }

  listenScroll(): void {
    this.subscription.add(
      fromEvent(window, 'scroll')
        .pipe(map(() => window.scrollY))
        .subscribe((data: number) => (this.hightScroll = data)),
    );
  }

  private setScrollHome(height: number): void {
    let scrollHome: { date: number; heightScroll: number } = {
      date: new Date().getTime(),
      heightScroll: height,
    };
    localStorage.setItem('scrollHomePlayRxjs', JSON.stringify(scrollHome));
  }

  private setPositionScrollHome(): void {
    if (localStorage.getItem('scrollHomePlayRxjs')) {
      const scrollHome: { date: number; heightScroll: number } = JSON.parse(
        localStorage.getItem('scrollHomePlayRxjs')!,
      );
      if (scrollHome.date + this.timeScroll >= new Date().getTime()) {
        window.scrollTo({
          top: scrollHome.heightScroll,
        });
      }
    }
    this.listenScroll();
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
