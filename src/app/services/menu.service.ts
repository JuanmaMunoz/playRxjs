import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private router = inject(Router);
  public openMenu = new BehaviorSubject<boolean>(false);

  public navigate(category: string, id?: string): void {
    const url = id ? `/${category}/${id}` : `/${category}`;
    if (url.includes('home')) localStorage.removeItem('scrollHomePlayRxjs');
    if (url === this.router.url) {
      this.router.navigate([`/${category}/`]);
    } else {
      window.setTimeout(() => this.router.navigate([url]), 10);
    }
  }
}
