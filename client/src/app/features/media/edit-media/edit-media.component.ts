import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  media: Media = new Media();
  private subscribeRoute: any;
  id: number;
  mediaEditFrom: FormGroup;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.mediaEditFrom.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private mediaService: MediaService,
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getMedia();
    this.initializeForm();
  }

  initializeForm() {
    this.mediaEditFrom = new FormGroup({
      title: new FormControl(this.media.title, [Validators.required]),
      description: new FormControl(this.media.description, [Validators.required]),
      releaseDate: new FormControl(null, [Validators.required]),
      coverUrl: new FormControl(this.media.coverUrl),
      mediaType: new FormControl(this.media.mediaType, [Validators.required]),
    });
  }

  ngOnDestroy() {
    this.subscribeRoute.unsubscribe();
  }
  control(controlName: string) {
    return this.mediaEditFrom.get(controlName);
  }

  getMedia() {
    {
      this.subscribeRoute = this.route.params.subscribe(params => {
        this.id = params['id'];
      });

      this.mediaService.getSingleMedia(this.id).subscribe(response => {
        this.media = response.data;
        let releaseDate = new Date(this.media.releaseDate);
        this.mediaEditFrom.patchValue({
          title: this.media.title,
          description: this.media.description,
          releaseDate: releaseDate,
          coverUrl: this.media.coverUrl,
          mediaType: this.media.mediaType
        });
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
    this.media.coverUrl = this.mediaEditFrom.value.coverUrl;
    this.media.mediaType = this.mediaEditFrom.value.mediaType;
  }
}
