import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { ScreeningCardComponent } from './screening-card/screening-card.component';

@NgModule({
    declarations: [
        ScreeningCardComponent,
        BuyTicketComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ScreeningCardComponent,
        BuyTicketComponent
    ]
})
export class TicketModule { }
