import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private router: Router) {}
  public openMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public navigate(category: string, id?: string): void {
    const url = id ? `/${category}/${id}` : `/${category}`;
    if (url === this.router.url) {
      this.router.navigate([`/${category}/`]);
    }
    window.setTimeout(() => this.router.navigate([url]), 10);
  }
}
