import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiTypeSubject = new BehaviorSubject<string>('newstories');
  private newsIdSubject = new BehaviorSubject<number[]>([]);
  private displayNewsSubject = new BehaviorSubject<ApiResponse[]>([]);
  private newIndex = 0;

  constructor(private api: ApiService) {}

  setApyType(apiType: string) {
    this.resetNews();
    this.apiTypeSubject.next(apiType);
  }

  fetchApi(apiType: string) {
    this.api.getNumericIdArray(apiType).subscribe((arr: number[]) => {
      this.newsIdSubject.next(arr);
      this.getNews();
    });
  }

  getNews() {
    const arr = this.newsIdSubject.value;
    const newsToDisplay = arr.slice(this.newIndex, this.newIndex + 10);
    newsToDisplay.forEach((id) => {
      this.api.getResponseApi(id).subscribe((news) => {
        this.displayNewsSubject.next([...this.displayNewsSubject.value, news]);
      });
    });
    this.newIndex += 10;
    if (arr.length<=this.newIndex){
      console.log('non ci sono altre notizie');
    } // da implementare meglio
  }

  getDisplayedNews(): Observable<ApiResponse[]> {
    return this.displayNewsSubject.asObservable();
  }

  resetNews() {
    this.newIndex = 0;
    this.displayNewsSubject.next([]);
  }
}
