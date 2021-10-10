import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetMedia } from 'src/app/core/models/getMedia';
import { Media } from 'src/app/core/models/media';
import { MediaType } from 'src/app/core/models/mediaType';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Media[] = [];
  getMoviesParams: GetMedia = { page: 1, itemsPerPage: 6, mediaType: MediaType.Movie, searchQuery: null };
  loadMoviesButton: boolean = true;

  constructor(private moviesService: MediaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getMedia(this.getMoviesParams).subscribe((response) => {
      this.movies = response;
      this.getMoviesParams.page++;
    });
  }

  loadMoreMovies() {
    this.moviesService.getMedia(this.getMoviesParams).subscribe((response) => {

      if (response.length === 0) {
        this.loadMoviesButton = false;
        this.toastr.warning(
          'We dont have any more movies', '');
      }

      this.movies = this.movies.concat(response);
      this.getMoviesParams.page++;
    });
  }
}
