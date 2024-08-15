import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';

const URL = 'https://hacker-news.firebaseio.com/v0';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiType!: string;

  constructor(private httpClient: HttpClient) {}

  getNumericIdArray(apiType: string): Observable<number[]> {
    return this.httpClient.get<number[]>(`${URL}/${apiType}.json`);
  }

  getResponseApi(id: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${URL}/item/${id}.json`);
  }
}
