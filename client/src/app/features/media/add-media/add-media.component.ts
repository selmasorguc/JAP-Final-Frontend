import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddMedia } from 'src/app/core/models/addMedia';
import { MediaType } from 'src/app/core/models/mediaType';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {
  addMediaForm: FormGroup;
  media: AddMedia = new AddMedia();
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.addMediaForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private mediaService: MediaService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  addNewMedia() {
    this.mapFormValue();
    console.log(this.addMediaForm.value);
    this.mediaService.addMedia(this.media).subscribe(() => {
      this.toastr.success("Media Added");
      this.router.navigate(["/adminArea"]);
    });
  }

  mapFormValue() {
    this.media.title = this.addMediaForm.value.title;
    this.media.description = this.addMediaForm.value.description;
    this.media.coverUrl = this.addMediaForm.value.coverUrl;
    this.media.mediaType = MediaType.Movie;
    this.media.releaseDate = this.addMediaForm.value.releaseDate;
  }

  control(controlName: string) {
    return this.addMediaForm.get(controlName);
  }

  initializeForm() {
    this.addMediaForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      releaseDate: new FormControl(new Date(), [Validators.required]),
      coverUrl: new FormControl(''),
      mediaType: new FormControl(null, [Validators.required]),
    });
  }
}
