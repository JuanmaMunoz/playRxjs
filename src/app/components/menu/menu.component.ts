import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fromEvent, Subscription } from 'rxjs';
import { basics } from '../../info/basic';
import { combinations } from '../../info/combinations';
import { conditionals } from '../../info/conditionals';
import { creations } from '../../info/creations';
import { errors } from '../../info/errors';
import { filterings } from '../../info/filterings';
import { mathematicals } from '../../info/mathematicals';
import { multicastings } from '../../info/multicastings';
import { realLife } from '../../info/realLife';
import { subjects } from '../../info/subjects';
import { transformations } from '../../info/transformations';
import { utilitys } from '../../info/utilitys';
import { IInfo } from '../../models/interfaces';
import { LanguageComponent } from '../language/language.component';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LanguageComponent,
    MenuItemsComponent,
    TranslateModule,
    SearchComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('menu') menu!: ElementRef;
  public infoCombination: IInfo = combinations;
  public infoConditional: IInfo = conditionals;
  public infoMathematical: IInfo = mathematicals;
  public infoTransformation: IInfo = transformations;
  public infoMulticasting: IInfo = multicastings;
  public infocreation: IInfo = creations;
  public infoFiltering: IInfo = filterings;
  public infoUtility: IInfo = utilitys;
  public infoError: IInfo = errors;
  public infoSubject: IInfo = subjects;
  public infoBasic: IInfo = basics;
  public realLife: IInfo = realLife;
  private subscription = new Subscription();
  public angular = 'assets/images/angular.png';
  public rxjs = 'assets/images/rxjs-logo.png';

  ngAfterViewInit(): void {
    this.subscription.add(
      fromEvent<MouseEvent>(window, 'click').subscribe((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
          target!.classList.contains('bi-x-circle-fill') ||
          target!.classList.contains('btn--menu') ||
          target!.classList.contains('btn__menu__icon') ||
          target!.classList.contains('bi-list') ||
          target!.classList.contains('menu-items__title') ||
          target!.classList.contains('menu-items__list__link') ||
          target!.classList.contains('menu__header__main') ||
          target!.classList.contains('menu__header__secondary') ||
          target!.classList.contains('language__label') ||
          target!.classList.contains('language__check')
        ) {
          this.menu.nativeElement.classList.toggle('menu--show');
          this.menu.nativeElement.classList.toggle('menu--hidden');
        } else if (target!.classList.contains('search__result__item')) {
          this.menu.nativeElement.classList.remove('menu--show');
          this.menu.nativeElement.classList.add('menu--hidden');
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
