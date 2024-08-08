import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {

  prova='newstories.json';
  apiType!:string;

  constructor(private route: ActivatedRoute,
    private api:ApiService){}
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.apiType = params['apiType'];
      console.log(this.apiType)
    })


    this.api.getNumericIdArray(this.prova).subscribe((arr:number[])=>{
      console.log(arr);
    })
    
  }

}
