import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { concatMap, fromEvent, map, Observable, of, tap } from 'rxjs';
import { transformations } from '../info/transformations';
import { IInfo } from '../models/interfaces';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, AfterViewInit {
  public obsResult!: Observable<IInfo[]>;
  public search: string = '';
  public visibleResult: boolean = false;

  constructor(
    private render: Renderer2,
    private router: Router,
    private menuService: MenuService,
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.obsResult = fromEvent(
      document.getElementById('search-text')!,
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
    const element = document.getElementById('search-text');
    this.render.setProperty(element, 'value', id);
    this.visibleResult = false;
    //this.router.navigate([`/${category}/${id}`]);
    this.menuService.navigate(category, id);
  }
}
