import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipe';
  link: string = 'recipes';

  constructor() {}

  setLink(link: string) {
    this.link = link;
  }
}
