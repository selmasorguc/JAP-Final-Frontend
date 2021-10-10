import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { AddScreening } from '../models/addScreening';
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

  addScreening(screening: AddScreening) {
    let headers = this.declareAuthHeader();
    return this.http.post<ServiceResponse<AddScreening>>(this.baseUrl + "screening", screening,
      { headers: headers });
  }

  getAddresses() {
    let headers = this.declareAuthHeader();
    return this.http.get<ServiceResponse<Address[]>>(this.baseUrl + "screening/addresses", { headers: headers });
  }

  addTicket(mediaId: number, screeningId: number, numberOfTickets: number) {
    let headers = this.declareAuthHeader();
    var ticketObj = { mediaId: mediaId, screeningId: screeningId, numberOfTickets: numberOfTickets };
    return this.http.post<ServiceResponse<Ticket>>(this.baseUrl + "tickets/buy", ticketObj,
      { headers: headers });
  }

  getUserTickets(username: string) {
    let headers = this.declareAuthHeader();
    return this.http.get<ServiceResponse<Ticket[]>>(this.baseUrl + "tickets/user/" + username,
      { headers: headers });
  }

  declareAuthHeader() {
    let headers = new HttpHeaders();
    var jwtToken = JSON.parse(localStorage.getItem('user')).token;
    const authroizationToken = 'bearer '.concat(jwtToken);
    headers = headers.append('Authorization', authroizationToken);
    return headers;
  }
}
