import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetMedia } from 'src/app/core/models/getMedia';
import { Media } from 'src/app/core/models/media';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Output() searchActive = new EventEmitter<boolean>();
  searchFrom: FormGroup = new FormGroup({
    searchQuery: new FormControl()
  });
  media: Media[] = [];
  getMediaParams: GetMedia = { page: 1, itemsPerPage: 6, mediaType: null , searchQuery: null};  


  constructor(private searchService: SearchService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  searchMedia() {
    let searchQuery = this.searchFrom.value.searchQuery;
    if (searchQuery !== '' && searchQuery.length >= 2) {
      this.getMediaParams.searchQuery = searchQuery;
      this.searchService.searchMedia(this.getMediaParams).subscribe((response) => {
        this.media = response;
        this.searchActive.emit(true);
      });
    }

    if(searchQuery === '') {
      this.media = [];
      this.searchActive.emit(false);
    }
  }
}
