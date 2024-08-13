import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../models/apiResponse.model';
import { NewsService } from '../../services/news.service';
import { Subject, takeUntil } from 'rxjs';
import { animation1 } from '../../shared/animations/animation1'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  animations: [animation1]
})
export class NewsComponent implements OnInit, OnDestroy {
  apiType = 'newstories';
  title = 'New Stories';
  displayedNews: ApiResponse[] = [];
  private destroy$ = new Subject<void>();
  fineArray = false;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.apiType = params.get('apiType') ?? this.apiType;
      this.setSectionTitle(this.apiType);
      this.newsService.setApyType(this.apiType);
      this.newsService.fetchApi(this.apiType);

    });

    this.newsService
      .getDisplayedNews().pipe(takeUntil(this.destroy$))
      .subscribe((news) => {
        this.displayedNews = news;
      });
    
    this.newsService.setFineArraay().pipe(takeUntil(this.destroy$))
      .subscribe((bool)=>{
        this.fineArray = bool;
      })
   
  }

  setSectionTitle(apiType: string) {
    switch (apiType) {
      case 'newstories':
        this.title = 'New Stories';
        break;
      case 'topstories':
        this.title = 'Top Stories';
        break;
      case 'beststories':
        this.title = 'Best Stories';
        break;
      case 'askstories':
        this.title = 'Ask Stories';
        break;
      case 'showstories':
        this.title = 'Show Stories';
        break;
      case 'jobstories':
        this.title = 'Job Stories';
        break;
    }
  } 

  loadMoreNews(){
   this.newsService.getNews();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
