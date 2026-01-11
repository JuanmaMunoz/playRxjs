import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../models/enums';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit, OnDestroy {
  @Input() id = '';
  public language: Language = Language.ENGLISH;
  public languageEnum = Language;
  private subscription = new Subscription();

  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.language = (localStorage.getItem('language') as Language) || Language.ENGLISH;
    this.subscription.add(
      this.translate.onLangChange.subscribe((data) => (this.language = data.lang as Language)),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setLanguage(lang: Language): void {
    this.translate.use(lang);
  }
}
