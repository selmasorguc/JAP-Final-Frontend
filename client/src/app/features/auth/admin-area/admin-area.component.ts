import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { GetMedia } from 'src/app/core/models/getMedia';
import { Media } from 'src/app/core/models/media';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
  media: Media[] = [];
  getMediaParams: GetMedia = { page: 1, itemsPerPage: 20, mediaType: null, searchQuery: null };
  loadMoviesButton: boolean = true; 
  rotate = true;
  maxSize = 3;
  constructor(private moviesService: MediaService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getMedia(this.getMediaParams).subscribe((response) => {
      this.media = response;
    });
  }
  
  pageChanged(event: PageChangedEvent): void {
    this.getMediaParams.page = event.page;
    this.moviesService.getMedia(this.getMediaParams).subscribe((response) => {
      this.media = response;
    });

  }
}
