import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { transformations } from '../info/transformations';
import { IInfo, IIntroduction } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class IntroductionService {
  constructor(private route: ActivatedRoute) {}
  public info: BehaviorSubject<IIntroduction> = new BehaviorSubject({
    title: '',
    description: '',
  } as IIntroduction);

  setIntroduction(url: string): void {
    const allInfo: IInfo[] = [transformations];
    const { title, description, category } = allInfo.filter((e: IInfo) =>
      url.includes(e.url),
    )[0];
    this.info.next({ title, description, category });
  }
}
