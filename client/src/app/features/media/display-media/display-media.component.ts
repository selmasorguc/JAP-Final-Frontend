import { Component } from '@angular/core';

@Component({
  selector: 'app-display-media',
  templateUrl: './display-media.component.html',
  styleUrls: ['./display-media.component.css']
})

export class DisplayMediaComponent {
 
  searchActive: boolean = false;
  
  isSearching(data: any) {
    this.searchActive = data;
  }
}
