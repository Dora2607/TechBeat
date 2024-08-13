import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const URL = 'https://hacker-news.firebaseio.com/v0';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of Id', () => {
    const apiType = 'newstories'
    const dummyIdArr: number[] = [
    1, 2, 3, 4, 5, 6,
    ];

    service.getNumericIdArray(apiType).subscribe((arr) => {
      expect(arr.length).toBe(dummyIdArr.length);
      expect(arr).toEqual(dummyIdArr);
    });

    const req = httpMock.expectOne(`${URL}/${apiType}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyIdArr);
  });



  it('should retrieve a list of News', () => {
    const id = 8863
    const dummyNews: ApiResponse = 
      {
        by : "dhouston",
        descendants : 71,
        id : 8863,
        kids : [ 9224, 8917, 8884, 8887, 8952, 8869],
        score : 104,
        time : 1175714200,
        title : "My YC app: Dropbox - Throw away your USB drive",
        type : "story",
        url : "http://www.getdropbox.com/u/2/screencast.html"
      }
    ;

    service.getResponseApi(id).subscribe((res) => {
      expect(res).toEqual(dummyNews);
    });

    const req = httpMock.expectOne(`${URL}/item/${id}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNews);
  });


});

