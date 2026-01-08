import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHobby, IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public getUsers(): Observable<IUser[]> {
    const url = 'assets/data/data2.json';
    return this.http.get<IUser[]>(url);
  }

  public gethobbies(): Observable<IHobby[]> {
    const url = 'assets/data/data.json';
    return this.http.get<IHobby[]>(url);
  }
}
