import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { combinations } from '../../info/combinations';
import { conditionals } from '../../info/conditionals';
import { creations } from '../../info/creations';
import { errors } from '../../info/errors';
import { filterings } from '../../info/filterings';
import { mathematicals } from '../../info/mathematicals';
import { multicastings } from '../../info/multicastings';
import { subjects } from '../../info/subjects';
import { transformations } from '../../info/transformations';
import { utilitys } from '../../info/utilitys';
import { IInfo } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';
import { LanguageComponent } from '../language/language.component';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent, LanguageComponent, MenuItemsComponent],
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
  private subscription = new Subscription();
  constructor(private menuService: MenuService) {}
  ngAfterViewInit(): void {
    this.subscription.add(
      this.menuService.openMenu.subscribe((open: boolean) => {
        this.menu.nativeElement.classList.toggle('menu--show');
        this.menu.nativeElement.classList.toggle('menu--hidden');
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
