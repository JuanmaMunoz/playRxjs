import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { filter, from, map, Observable, of, toArray } from 'rxjs';

@Component({
  selector: 'app-examples2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examples2.component.html',
  styleUrl: './examples2.component.scss',
})
export class Examples2Component {
  public obsString1!: Observable<string[]>;
  public obsString2!: Observable<string[]>;
  public obsNumber1!: Observable<number[]>;

  ngOnInit(): void {
    this.stringToArray();
    this.numbersToArray();
    this.filterNumber();
  }

  private stringToArray(): void {
    this.obsString1 = of('this words will be a array').pipe(
      map((e) => e.split(' '))
    );
  }

  private numbersToArray(): void {
    this.obsString2 = from([1, 2, 3, 4, 5]).pipe(
      map((e) => `-${e}${Math.random()}.txt `),
      toArray()
    );
  }

  private filterNumber(): void {
    this.obsNumber1 = from([1, 2, 3, 4, 5, 6]).pipe(
      filter((e) => e % 2 === 0),
      toArray()
    );
  }
}
