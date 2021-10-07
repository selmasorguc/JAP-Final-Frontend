import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/ticket.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  tickets: Ticket[] = [];
  constructor(private ticketService: TicketService, public userService: UserService) { }

  ngOnInit(): void {
    this.ticketService.getUserTickets(this.userService.getCurrentUsername()).subscribe(
      (response: any) =>{
        this.tickets = response.data;
      }
    );

  }

}
