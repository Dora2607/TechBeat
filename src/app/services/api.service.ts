import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'https://hacker-news.firebaseio.com/v0';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiType!: string;

  constructor(private httpClient: HttpClient) {}

  getNumericIdArray(apiType: string): Observable<number[]> {
    return this.httpClient.get<number[]>(`${URL}/${apiType}`);
  }
}
