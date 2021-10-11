import { Component, OnInit } from '@angular/core';
import { Screening } from 'src/app/core/models/screening';
import { ServiceResponse } from 'src/app/core/models/serviceResponse';
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
