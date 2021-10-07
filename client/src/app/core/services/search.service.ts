import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetMedia } from '../models/getMedia';
import { Media } from '../models/media';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  searchMedia(getMediaParams: GetMedia) {
    let params = new HttpParams().set("SearchQuery", getMediaParams.searchQuery);
    return this.http.get<Media[]>(this.baseUrl + "media", { params: params });
  }

}
