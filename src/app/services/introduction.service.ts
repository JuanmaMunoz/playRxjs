import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { combinations } from '../info/combinations';
import { conditionals } from '../info/conditionals';
import { mathematicals } from '../info/mathematicals';
import { transformations } from '../info/transformations';
import { IInfo } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class IntroductionService {
  constructor(private route: ActivatedRoute) {}
  public info: BehaviorSubject<string> = new BehaviorSubject('');

  setIntroduction(url: string): void {
    const allInfo: IInfo[] = [transformations, combinations, conditionals, mathematicals];
    const { category } = allInfo.filter((e: IInfo) => url.includes(e.url))[0];
    this.info.next(category);
  }
}
