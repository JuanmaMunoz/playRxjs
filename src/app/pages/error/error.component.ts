import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, retry, Subscription, throwError, timeout } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ExampleComponent } from '../../components/example/example.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { errors } from '../../info/errors';
import { IInfo } from '../../models/interfaces';
import { IntroductionService } from '../../services/introduction.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, ExampleComponent, IntroductionComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements OnInit, AfterViewInit, OnDestroy {
  public info!: IInfo;
  public subscription = new Subscription();

  private renderer = inject(Renderer2);
  private route = inject(ActivatedRoute);
  private introductionService = inject(IntroductionService);

  ngOnInit(): void {
    this.info = errors;
    const url = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.introductionService.setIntroduction(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.operatorCatchError();
    this.operatorRetry();
  }

  private operatorCatchError(): void {
    const obs$ = throwError(new Error('server error')).pipe(
      timeout(2000),
      catchError(() => of([])),
    );
    this.subscription.add(
      obs$.subscribe((resp) => this.addConsole('catchError', JSON.stringify(resp))),
    );
  }

  private operatorRetry(): void {
    const obs$ = ajax('https://fake.url.test.retry').pipe(retry(1));
    this.subscription.add(
      obs$.subscribe({
        error: (err: HttpErrorResponse) => this.addConsole('retry', JSON.stringify(err.message)),
      }),
    );
  }

  private addConsole(id: string, data: string): void {
    const div = document.createElement('div');
    div.textContent = `${data}`;
    if (document.getElementById(`console-${id}`))
      this.renderer.appendChild(document.getElementById(`console-${id}`), div);
  }
}
