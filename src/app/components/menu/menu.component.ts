import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
import { MenuService } from '../../services/menu.service';
import { slideToggle } from '../../utils/animations';
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
  animations: [slideToggle(400)],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit, OnDestroy {
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
  private menuService = inject(MenuService);
  public menuOpen = false;

  ngAfterViewInit(): void {
    this.subscription.add(
      this.menuService.openMenu.subscribe((open: boolean) => {
        this.menuOpen = open;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public navigate(category: string, id?: string): void {
    this.menuService.openMenu.next(false);
    this.menuService.navigate(category, id);
  }
}
