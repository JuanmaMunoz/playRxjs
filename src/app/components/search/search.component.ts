import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { concatMap, fromEvent, map, Observable, of, Subscription, tap } from 'rxjs';
import { combinations } from '../../info/combinations';
import { conditionals } from '../../info/conditionals';
import { creations } from '../../info/creations';
import { mathematicals } from '../../info/mathematicals';
import { multicastings } from '../../info/multicastings';
import { transformations } from '../../info/transformations';
import { IInfo, IInfoItem, ISearch } from '../../models/interfaces';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() modeMenu: string = '';
  public obsResult!: Observable<ISearch[]>;
  public search: string = '';
  public visibleResult: boolean = false;
  private subscrption = new Subscription();
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.subscrption.add(this.menuService.openMenu.subscribe(() => (this.visibleResult = false)));
  }

  ngOnDestroy(): void {
    this.subscrption.unsubscribe();
  }

  ngAfterViewInit(): void {
    const allInfo: ISearch[] = this.setSearchList([
      transformations,
      combinations,
      conditionals,
      mathematicals,
      multicastings,
      creations,
    ]);
    this.obsResult = fromEvent(document.getElementsByClassName('search__text')!, 'input').pipe(
      concatMap((e: any) =>
        of(allInfo).pipe(
          map((a: ISearch[]) =>
            a.filter((i: ISearch) => e.target!.value.length > 1 && i.id.includes(e.target.value)),
          ),
          tap((e) => (this.visibleResult = true)),
        ),
      ),
    );
  }

  private setSearchList(info: IInfo[]): ISearch[] {
    let searchList: ISearch[] = [];
    info.forEach((e: IInfo) => {
      e.items.forEach((i: IInfoItem) =>
        searchList.push({ id: i.id, category: e.category, url: e.url }),
      );
    });
    return searchList;
  }

  public navigate(category: string, id: string): void {
    this.search = id;
    this.visibleResult = false;
    this.menuService.navigate(category, id);
  }

  public clearText(): void {
    this.search = '';
    this.visibleResult = false;
  }
}
