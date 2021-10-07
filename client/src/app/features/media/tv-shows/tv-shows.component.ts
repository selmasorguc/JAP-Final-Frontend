import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetMedia } from 'src/app/core/models/getMedia';
import { Media } from 'src/app/core/models/media';
import { MediaType } from 'src/app/core/models/mediaType';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  tvshows: Media[] = [];
  loadTVShowsButton: boolean = true;
  getTvShowsParams: GetMedia = {
    page: 1,
    itemsPerPage: 6,
    mediaType: MediaType.TvShow,
    searchQuery: null
  };

  constructor(private moviesService: MediaService,
    private toastr: ToastrService) { }

  ngOnInit(): void { this.loadTVShows(); }

  loadTVShows() {
    this.moviesService.getMedia(this.getTvShowsParams).subscribe((response) => {
      this.tvshows = response;
      this.getTvShowsParams.page++;
    });
  }

  loadMoreTVShows() {
    this.moviesService.getMedia(this.getTvShowsParams).subscribe((response) => {

      if (response.length === 0) {
        this.loadTVShowsButton = false;
        this.toastr.warning(
          'We dont have any more TV Shows', '');
      }

      this.tvshows = this.tvshows.concat(response);
      this.getTvShowsParams.page++;
    }, error => { console.log(error); });
  }
}
