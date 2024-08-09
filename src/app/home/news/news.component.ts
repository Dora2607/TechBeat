import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  apiType = 'newstories';
  title = 'New Stories';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.apiType = params.get('apiType') ?? this.apiType;
      this.setSectionTitle(this.apiType);
      this.fetchApi(this.apiType)

    });
  }

  setSectionTitle(apiType:string) {
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

  fetchApi(apiType:string){
    this.api.getNumericIdArray(apiType).subscribe((arr: number[]) => {
      console.log(arr);
    });
  }
  
}
