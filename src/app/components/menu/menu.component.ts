import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { combinations } from '../../info/combinations';
import { transformations } from '../../info/transformations';
import { MenuItemsComponent } from '../../menu-items/menu-items.component';
import { IInfo } from '../../models/interfaces';
import { SearchComponent } from '../../search/search.component';
import { MenuService } from '../../services/menu.service';
import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuItemsComponent, SearchComponent, LanguageComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('menu') menu!: ElementRef;
  public infoCombination: IInfo = combinations;
  public infoTransformation: IInfo = transformations;
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
