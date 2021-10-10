import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Screening } from 'src/app/core/models/screening';
import { MediaService } from 'src/app/core/services/media.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-screening-card',
  templateUrl: './screening-card.component.html',
  styleUrls: ['./screening-card.component.css']
})
export class ScreeningCardComponent implements OnInit {
  @Input() screening!: Screening;
  numberOfTickets: number = 1;
  buyTicketsFrom: FormGroup;

  constructor(private mediaService: MediaService,
    private ticketService: TicketService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  buyTickets(){
    console.log(this.buyTicketsFrom.value.numberOfTickets);
    this.numberOfTickets = this.buyTicketsFrom.value.numberOfTickets;
    this.ticketService.addTicket(this.screening.mediaId, this.screening.id, this.numberOfTickets).subscribe(
      () => {
        this.toastr.success("You bought a ticket for " + this.screening.media.title);
      }
    );
  }

  initializeForm() {
    this.buyTicketsFrom = new FormGroup({
      numberOfTickets: new FormControl(null)
    });
  }
}
