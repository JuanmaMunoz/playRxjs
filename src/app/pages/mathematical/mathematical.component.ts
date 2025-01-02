import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count, max, min, of, reduce, Subscription } from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { mathematicals } from '../../info/mathematicals';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-mathematical',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './mathematical.component.html',
  styleUrl: './mathematical.component.scss',
})
export class MathematicalComponent implements OnInit, AfterViewInit {
  public info!: IInfo;
  public subscription = new Subscription();

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
    this.info = mathematicals;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorCount();
    this.operatorMax();
    this.operatorMin();
    this.operatorReduce();
  }

  private operatorCount(): void {
    const obs$ = of(1, 2, 3, 4, 5);
    this.subscription.add(
      obs$
        .pipe(count((n: number) => n > 3))
        .subscribe((data: number) => this.addConsole('count', JSON.stringify(data))),
    );
  }

  private operatorMax(): void {
    const obs$ = of(1, 2, 3, 4, 5);
    this.subscription.add(
      obs$.pipe(max()).subscribe((data: number) => this.addConsole('max', JSON.stringify(data))),
    );
  }

  private operatorMin(): void {
    const obs$ = of(1, 2, 3, 4, 5);
    this.subscription.add(
      obs$.pipe(min()).subscribe((data: number) => this.addConsole('min', JSON.stringify(data))),
    );
  }

  private operatorReduce(): void {
    const obs$ = of(1, 2, 3, 4, 5);
    this.subscription.add(
      obs$
        .pipe(reduce((acc, value) => acc + value, 0))
        .subscribe((data: number) => this.addConsole('reduce', JSON.stringify(data))),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
