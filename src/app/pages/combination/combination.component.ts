import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, of, Subscription } from 'rxjs';
import { ExampleComponent } from '../../components/example/example.component';
import { combinations } from '../../info/combinations';
import { IntroductionComponent } from '../../introduction/introduction.component';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-combination',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './combination.component.html',
  styleUrl: './combination.component.scss',
})
export class CombinationComponent implements OnInit, AfterViewInit {
  public info!: IInfo;
  public subscription = new Subscription();

  constructor(
    private userService: UserService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private introductionService: IntroductionService,
  ) {}

  ngOnInit(): void {
    this.info = combinations;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorCombineLatest();
  }

  private operatorCombineLatest(): void {
    const obs1$ = of(1, 2);
    const obs2$ = of('a', 'b');
    const obs3$ = of(3, 4, 5);
    this.subscription.add(
      combineLatest([obs1$, obs2$, obs3$]).subscribe((data) =>
        this.addConsole('combineLatest', JSON.stringify(data)),
      ),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
