import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './features/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MediaModule } from './features/media/media.module';
import { TicketModule } from './features/tickets/ticket.module';
import { AlertModule } from 'ngx-bootstrap/alert';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    //features
    MediaModule,
    AuthModule,
    TicketModule,
    //---
    AppRoutingModule,
    HttpClientModule,
    RatingModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
