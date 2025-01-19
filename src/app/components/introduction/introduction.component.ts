import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IInfo } from '../../models/interfaces';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
export class IntroductionComponent implements AfterViewInit, OnDestroy {
  @Input() info!: IInfo;
  private subscription = new Subscription();
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    const offset = 130;
    this.subscription.add(
      this.route.params.subscribe((params: any) => {
        const { id } = params;
        /*document
          .getElementById(`operator-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });*/
        const target = document.getElementById(`operator-${id}`);
        if (target) {
          const elementPosition = target!.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
