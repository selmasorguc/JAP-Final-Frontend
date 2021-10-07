import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Media } from 'src/app/core/models/media';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrls: ['./edit-media.component.css']
})
export class EditMediaComponent implements OnInit {
  @Input() media!: Media;
  private subscribeRoute: any;
  id: number;
  mediaEditFrom: FormGroup;
  date: NgbDateStruct;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.mediaEditFrom.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private mediaService: MediaService,
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.formSetUp();
    this.getMedia();
  }

  formSetUp() {
    this.mediaEditFrom = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'releaseDate': new FormControl(null)
    });
  }

  ngOnDestroy() {
    this.subscribeRoute.unsubscribe();
  }

  getMedia() {
    {
      this.subscribeRoute = this.route.params.subscribe(params => {
        this.id = params['id'];
      });

      this.mediaService.getSingleMedia(this.id).subscribe(response => {
        this.media = response.data;
        let parsedDate = moment(this.mediaEditFrom.value.releaseDate, "YYYY-MM-DD");
        let outputDate = parsedDate.format("YYYY-MM-DD");
        this.mediaEditFrom.patchValue({
          title: this.media.title,
          description: this.media.description,
          releaseDate: this.media.releaseDate
        });
        this.mediaEditFrom.reset;
      });
    }
  }

  editMedia() {
    this.mapFormValue();
    this.mediaService.eidMedia(this.media).subscribe(response => {
      if (response.data) {
        this.toastr.success("Media edited", "Success")
        this.router.navigate(["/adminArea"]);
      }
    });
  }

  mapFormValue() {
    this.media.title = this.mediaEditFrom.value.title;
    this.media.description = this.mediaEditFrom.value.description;
    this.media.releaseDate = this.mediaEditFrom.value.releaseDate;
  }
}
