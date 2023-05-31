import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed: boolean = true;
  @Output('links') link = new EventEmitter<string>();

  setLink(e) {
    this.link.emit(e.target.textContent.toLowerCase());
  }
}
