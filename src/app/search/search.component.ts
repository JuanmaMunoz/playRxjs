import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, AfterViewInit {
  private subscription = new Subscription();
  //public obsInfo: Observable<IInfo> = concat(transformations);
  public obsResult!: Observable<IInfo[]>;
  public search: string = '';
  public visibleResult: boolean = false;

  constructor(
    private router: Router,
    private render: Renderer2,
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
                e.target!.value.length > 1 && i.title.includes(e.target.value),
            ),
          ),
          tap((e) => (this.visibleResult = true)),
        ),
      ),
    );
  }

  public navigate(category: string, id: string): void {
    this.visibleResult = false;
    this.router.navigate([`/${category}/${id}`]);
  }
}
