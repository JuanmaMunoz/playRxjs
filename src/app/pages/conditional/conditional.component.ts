import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  defaultIfEmpty,
  every,
  find,
  findIndex,
  isEmpty,
  of,
  sequenceEqual,
  Subscription,
} from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { conditionals } from '../../info/conditionals';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-conditional',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './conditional.component.html',
  styleUrl: './conditional.component.scss',
})
export class ConditionalComponent implements OnInit, AfterViewInit {
  public info!: IInfo;
  public subscription = new Subscription();

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
    this.info = conditionals;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorDefaultIfEmpty();
    this.operatorEvery();
    this.operatorFind();
    this.operatorFindIndex();
    this.operatorIsEmpty();
    this.operatorSequenceEqual();
  }

  private operatorDefaultIfEmpty(): void {
    const obs1$ = of();
    this.subscription.add(
      obs1$
        .pipe(defaultIfEmpty('No Data'))
        .subscribe((data) => this.addConsole('defaultIfEmpty', JSON.stringify(data))),
    );
  }

  private operatorEvery(): void {
    const obs$ = of(5, 10, 20, 4);
    this.subscription.add(
      obs$
        .pipe(every((n: number) => n >= 5))
        .subscribe((data: boolean) => this.addConsole('every', JSON.stringify(data))),
    );
  }

  private operatorFind(): void {
    const obs$ = of(5, 10, 20, 4);
    this.subscription.add(
      obs$
        .pipe(find((n: number) => n >= 5))
        .subscribe((data: number | undefined) => this.addConsole('find', JSON.stringify(data))),
    );
  }

  private operatorFindIndex(): void {
    const obs$ = of(5, 10, 20, 4);
    this.subscription.add(
      obs$
        .pipe(findIndex((n: number) => n >= 5))
        .subscribe((data: number | undefined) =>
          this.addConsole('findIndex', JSON.stringify(data)),
        ),
    );
  }

  private operatorIsEmpty(): void {
    const obs$ = of();
    this.subscription.add(
      obs$
        .pipe(isEmpty())
        .subscribe((data: boolean) => this.addConsole('isEmpty', JSON.stringify(data))),
    );
  }

  private operatorSequenceEqual(): void {
    const obs1$ = of(5, 10, 20, 4);
    const obs2$ = of(5, 10, 20, 3);
    this.subscription.add(
      obs1$
        .pipe(sequenceEqual(obs2$))
        .subscribe((data: boolean) => this.addConsole('sequenceEqual', JSON.stringify(data))),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
