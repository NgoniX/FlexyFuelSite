import { fadeAnimation } from './shared/animations/fade-int-route';
import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements AfterViewInit {
  title = 'Flexy Fuel';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const loader = this.renderer.selectRootElement('#loader');
    loader.style.display = 'none';
  }

}
