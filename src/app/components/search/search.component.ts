import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { concatMap, filter, fromEvent, map, Observable, of, Subscription, tap } from 'rxjs';
import { basics } from '../../info/basic';
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
import { IInfo, IInfoItem, ISearch } from '../../models/interfaces';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() modeMenu = '';
  public obsResult!: Observable<ISearch[]>;
  public search = '';
  public visibleResult = false;
  private subscription = new Subscription();
  private router = inject(Router);

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        this.search = '';
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    const allInfo: ISearch[] = this.setSearchList([
      transformations,
      combinations,
      conditionals,
      mathematicals,
      multicastings,
      creations,
      filterings,
      utilitys,
      errors,
      subjects,
      basics,
    ]);
    this.obsResult = fromEvent(document.getElementsByClassName('search__text')!, 'input').pipe(
      concatMap((e) =>
        of(allInfo).pipe(
          map((a: ISearch[]) =>
            a
              .filter(
                (i: ISearch) =>
                  (e.target! as HTMLButtonElement).value.length > 1 &&
                  i.id
                    .toLocaleLowerCase()
                    .includes((e.target! as HTMLButtonElement).value.toLocaleLowerCase()),
              )
              .slice(0, 5),
          ),
          tap(() => (this.visibleResult = true)),
        ),
      ),
    );

    this.subscription.add(
      fromEvent<MouseEvent>(window, 'click').subscribe((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
          target!.classList.contains('search__result__item') ||
          target!.classList.contains('bi-rocket-takeoff')
        ) {
          this.visibleResult = false;
        }
      }),
    );
  }

  private setSearchList(info: IInfo[]): ISearch[] {
    const searchList: ISearch[] = [];
    info.forEach((e: IInfo) => {
      e.items.forEach((i: IInfoItem) =>
        searchList.push({ id: i.id, category: e.category, url: e.url }),
      );
    });
    return searchList;
  }

  public clearText(): void {
    this.search = '';
    this.visibleResult = false;
  }
}
