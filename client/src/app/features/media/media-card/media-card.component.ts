import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MediaService } from 'src/app/core/services/media.service';
import { Media } from 'src/app/core/models/media';
import { ServiceResponse } from 'src/app/core/models/serviceResponse';
import { Rating } from 'src/app/core/models/rating';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {
  @Input() movie!: Media;
  rate = 0;
  max = 5;
  isReadonly = false;

  constructor(private mediaService: MediaService, private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
  }

  
  ngOnInit(): void {
    this.mediaService.getCurrentAverageRating(this.movie.id).subscribe(
      (response: ServiceResponse<number>) => {
      this.rate = response.data;
    });
  }

  addRating($event: any) {
    var newRating: Rating = { value: this.rate, mediaId: this.movie.id };
    this.movie.ratings.push(newRating);
    this.mediaService.addRating(newRating).subscribe((response: ServiceResponse<number>) => {
      this.rate = response.data;
      this.toastr.success(
        'Thank you for leaving a rating', '',
        {
          positionClass: 'toast-bottom-center',
          tapToDismiss: true,
          closeButton: true
        });
      
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
        location.reload();
      }, 1300);
    })
  }

}
