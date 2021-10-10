import { TicketService } from './../../../core/services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address';
import { Media } from 'src/app/core/models/media';
import { AddScreening } from 'src/app/core/models/addScreening';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.css']
})
export class AddScreeningComponent implements OnInit {
  addScreeningForm: FormGroup;
  private subscribeRoute: any;
  mediaId: number;
  addresses: Address[] = [];
  screening: AddScreening = new AddScreening();
  minDate: Date;

  constructor(private service: TicketService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.subscribeRoute = this.route.params.subscribe(params => {
      this.mediaId = params['id'];
    });
    this.initializeForm();
    this.getAddresses();
  }

  ngOnDestroy() {
    this.subscribeRoute.unsubscribe();
  }

  initializeForm() {
    this.addScreeningForm = new FormGroup({
      startTime: new FormControl(new Date(), [Validators.required]),
      maxSeatsNumber: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
  }

  control(controlName: string) {
    return this.addScreeningForm.get(controlName);
  }

  addScreening() {
    this.screening.mediaId = this.mediaId;
    this.mapFormValue();
    this.service.addScreening(this.screening).subscribe(() => {
      this.toastr.success("Screening Added");
      this.router.navigate(["/adminArea"]);
    }, () => {
      this.toastr.error("Something went wrong", "Ups");
    }
    )
  }

  getAddresses() {
    this.service.getAddresses().subscribe(response => {
      this.addresses = response.data;
    })
  }

  mapFormValue() {
    this.screening.addressId = this.addScreeningForm.value.address;
    this.screening.maxSeatsNumber = this.addScreeningForm.value.maxSeatsNumber;
    this.screening.price = this.addScreeningForm.value.price;
    this.screening.startTime = this.addScreeningForm.value.startTime;
  }
}
