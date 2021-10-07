import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetMedia } from '../models/getMedia';
import { Media } from '../models/media';
import { Screening } from '../models/screening';
import { ServiceResponse } from '../models/serviceResponse';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getScreenings() {
    return this.http.get(this.baseUrl + "screening");
  }

  addTicket(mediaId: number, screeningId: number) {
    let headers = new HttpHeaders();
    var jwtToken = JSON.parse(localStorage.getItem('user')).token;
    const authroizationToken = 'bearer '.concat(jwtToken);
    headers = headers.append('Authorization', authroizationToken);
    
    var ticketObj = { mediaId: mediaId, screeningId: screeningId };
    return this.http.post<ServiceResponse<Ticket>>(this.baseUrl + "tickets/buy", ticketObj, 
    {headers: headers});
  }

  getUserTickets(username: string) {
    let headers = new HttpHeaders();
    var jwtToken = JSON.parse(localStorage.getItem('user')).token;
    const authroizationToken = 'bearer '.concat(jwtToken);
    headers = headers.append('Authorization', authroizationToken);
        return this.http.get<ServiceResponse<Ticket[]>>(this.baseUrl + "tickets/user/" + username, 
    {headers: headers});
  }
}
