import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { introductions } from '../info/introductions';
import { IIntroduction } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class IntroductionService {
  constructor(private route: ActivatedRoute) {}
  public info: BehaviorSubject<IIntroduction> = new BehaviorSubject(
    {} as IIntroduction,
  );

  setIntroduction(url: string): void {
    const { title, description, category } = introductions.filter(
      (e: IIntroduction) => url.includes(e.category),
    )[0];
    this.info.next({ title, description, category });
  }
}
