import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Screening } from 'src/app/core/models/screening';
import { MediaService } from 'src/app/core/services/media.service';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-screening-card',
  templateUrl: './screening-card.component.html',
  styleUrls: ['./screening-card.component.css']
})
export class ScreeningCardComponent implements OnInit {
  @Input() screening!: Screening;
  constructor(private mediaService: MediaService,
    private ticketService: TicketService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  buyTicket(){
    this.ticketService.addTicket(this.screening.mediaId, this.screening.id).subscribe(
      () => {
        this.toastr.success("You bought a ticket for " + this.screening.media.title);
      }
    );
  }
}
