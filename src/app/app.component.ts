import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private meta: Meta,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('TechBeat');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'TechBeat is an application that allows you to view the latest available news on various topics.',
      },
      {
        name: 'keywords',
        content:
          'news, techBeat, latest news, tech news, updated news, various topics, news exploration, news link, news date, news title',
      },
      {
        property: 'og:title',
        content: 'TechBeat',
      },
      {
        property: 'og:description',
        content:
          'techBeat is an application that allows you to view the latest available news on various topics.',
      },
      { property: 'og:image', content: 'URL of the Open Graph image' },
      { property: 'og:url', content: 'URL of your page' },
    ]);
  }
}
