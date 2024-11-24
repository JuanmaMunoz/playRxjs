import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  concatMap,
  fromEvent,
  map,
  Observable,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { transformations } from '../info/transformations';
import { IInfo } from '../models/interfaces';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() modeMenu: string = '';
  public obsResult!: Observable<IInfo[]>;
  public search: string = '';
  public visibleResult: boolean = false;
  private subscrption = new Subscription();
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.subscrption.add(
      this.menuService.openMenu.subscribe(() => (this.visibleResult = false)),
    );
  }

  ngOnDestroy(): void {
    this.subscrption.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.obsResult = fromEvent(
      document.getElementsByClassName('search__text')!,
      'input',
    ).pipe(
      concatMap((e: any) =>
        of(transformations).pipe(
          map((a: IInfo[]) =>
            a.filter(
              (i: IInfo) =>
                e.target!.value.length > 1 &&
                i.title
                  .toLocaleLowerCase()
                  .includes(e.target.value.toLocaleLowerCase()),
            ),
          ),
          tap((e) => (this.visibleResult = true)),
        ),
      ),
    );
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
