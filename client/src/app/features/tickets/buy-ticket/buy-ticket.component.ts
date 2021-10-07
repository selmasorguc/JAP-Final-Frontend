import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Media } from 'src/app/core/models/media';
import { Screening } from 'src/app/core/models/screening';
import { ServiceResponse } from 'src/app/core/models/serviceResponse';
import { MediaService } from 'src/app/core/services/media.service';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  screenings: Screening[] = [];

  constructor(private buyingService: TicketService) { }

  ngOnInit(): void {
    this.buyingService.getScreenings().subscribe((response: ServiceResponse<Screening[]>) => {
      this.screenings = response.data;
    })
  }
}
