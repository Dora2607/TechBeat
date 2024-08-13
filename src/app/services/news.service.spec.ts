import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';

describe('NewsService', () => {
  let service: NewsService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', [
      'getNumericIdArray',
      'getResponseApi',
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: spy }],
    });
    service = TestBed.inject(NewsService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch API and get news', () => {
    const apiType = 'newstories';
    const dummyIdArr: number[] = [1, 2, 3, 4, 5, 6];
    const dummyNews: ApiResponse = {
      by: "dhouston",
      descendants: 71,
      id: 8863,
      kids: [9224, 8917, 8884, 8887, 8952, 8869],
      score: 104,
      time: 1175714200,
      title: "My YC app: Dropbox - Throw away your USB drive",
      type: "story",
      url: "http://www.getdropbox.com/u/2/screencast.html"
    };

    apiService.getNumericIdArray.and.returnValue(of(dummyIdArr));
    apiService.getResponseApi.and.returnValue(of(dummyNews));
    spyOn(service, 'getNews').and.callThrough();

    service.fetchApi(apiType);

    expect(apiService.getNumericIdArray).toHaveBeenCalledWith(apiType);
    expect(service['newsIdSubject'].value).toEqual(dummyIdArr);
    expect(service.getNews).toHaveBeenCalled();

    service.getDisplayedNews().subscribe(news => {
      expect(news).toContain(dummyNews);
    });
  });

  it('should return displayed news as observable', () => {
    service.getDisplayedNews().subscribe(news => {
      expect(news).toEqual(service['displayNewsSubject'].value);
    });
  });

  it('should return fineArraySubject as observable', () => {
    service.setFineArraay().subscribe(fineArray => {
      expect(fineArray).toEqual(service['fineArraySubject'].value);
    });
  });

  it('should reset news', () => {
    service.resetNews();
    expect(service['newIndex']).toBe(0);
    service.getDisplayedNews().subscribe((news) => {
      expect(news).toEqual([]);
    });
  });

});
