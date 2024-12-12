import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IInfo } from '../models/interfaces';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
export class IntroductionComponent implements AfterViewInit, OnDestroy {
  @Input() info!: IInfo;
  private subscription = new Subscription();
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.subscription.add(
      this.route.params.subscribe((params: any) => {
        const { id } = params;
        document
          .getElementById(`operator-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
