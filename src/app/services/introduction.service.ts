import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { basics } from '../info/basic';
import { combinations } from '../info/combinations';
import { conditionals } from '../info/conditionals';
import { creations } from '../info/creations';
import { errors } from '../info/errors';
import { filterings } from '../info/filterings';
import { mathematicals } from '../info/mathematicals';
import { multicastings } from '../info/multicastings';
import { realLife } from '../info/realLife';
import { subjects } from '../info/subjects';
import { transformations } from '../info/transformations';
import { utilitys } from '../info/utilitys';
import { IInfo } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class IntroductionService {
  public info = new BehaviorSubject<string>('');

  setIntroduction(url: string): void {
    const allInfo: IInfo[] = [
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
      realLife,
    ];
    const { category } = allInfo.filter((e: IInfo) => url.includes(e.url))[0];
    this.info.next(category);
  }
}
