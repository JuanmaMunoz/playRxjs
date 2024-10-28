import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  combineLatest,
  concat,
  endWith,
  from,
  map,
  Observable,
  range,
  startWith,
  tap,
  toArray,
  withLatestFrom,
  zip,
} from 'rxjs';

@Component({
  selector: 'app-examples5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examples5.component.html',
  styleUrl: './examples5.component.scss',
})
export class Examples5Component {
  public obsNumbers = from([1, 7]);
  public obsRangeNumbers = range(1, 3);
  public concatObs!: Observable<number[]>;
  public concatObs2!: Observable<number[]>;
  public obsHight = from([2, 3, 5]);
  public obsWidth = from([3, 2, 4]);
  public obsArea!: Observable<string[]>;
  public obsArea2!: Observable<string[]>;
  public obsArea3!: Observable<string[]>;

  ngOnInit(): void {
    this.concatObservables();
    this.startAndEnd();
    this.combineLatest();
    this.withLatestFrom();
    this.allAreas();
  }

  private concatObservables(): void {
    this.concatObs = concat(this.obsNumbers, this.obsRangeNumbers).pipe(
      toArray()
    );
  }

  private startAndEnd(): void {
    this.concatObs2 = concat(this.obsNumbers, this.obsRangeNumbers).pipe(
      startWith(0),
      endWith(10),
      toArray()
    );
  }

  private combineLatest(): void {
    this.obsArea = combineLatest([this.obsWidth, this.obsHight]).pipe(
      map(([w, h]) => `area = w (${w}) * h (${h}) => ${h * w}`),
      toArray()
    );
  }

  private withLatestFrom(): void {
    this.obsArea2 = this.obsWidth.pipe(
      withLatestFrom(this.obsHight),
      map(([w, h]) => `area = w (${w}) * h (${h}) => ${h * w}`),
      toArray(),
      tap((e) => console.log(e))
    );
  }

  private allAreas(): void {
    this.obsArea3 = zip([this.obsHight, this.obsWidth]).pipe(
      map(([h, w]) => `area = w (${w}) * h (${h}) => ${h * w}`),
      toArray()
    );
  }
}
