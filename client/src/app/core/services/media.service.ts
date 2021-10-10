import { ServiceResponse } from '../models/serviceResponse';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetMedia } from '../models/getMedia';
import { Media } from '../models/media';
import { Rating } from '../models/rating';
import { environment } from 'src/environments/environment';
import { AddMedia } from '../models/addMedia';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  baseUrl: string = environment.baseUrl;
  movies: any;

  constructor(private http: HttpClient, private router: RouterModule) { }

  addRating(rating: Rating) {
    console.log(rating);
    return this.http.post<ServiceResponse<number>>(this.baseUrl + "ratings/add", rating);
  }

  getCurrentAverageRating(mediaId: number) {
    return this.http.get<ServiceResponse<number>>(this.baseUrl + "ratings/average/" + mediaId);
  }
  
  getMedia(getMediaParams: GetMedia) {
    var params = new HttpParams();
    if(getMediaParams.page != null && getMediaParams.itemsPerPage != null){ 
      params = params.append('PageNumber', getMediaParams.page.toString());
      params = params.append('PageSize', getMediaParams.itemsPerPage.toString());
    }
    if(getMediaParams.searchQuery != null)
      params = params.append('SearchQuery', getMediaParams.searchQuery);

    if(getMediaParams.mediaType != null)
      params = params.append('MediaType', getMediaParams.mediaType);
    return this.http.get<Media[]>(this.baseUrl + "media", { params: params});
  }

  getSingleMedia(id: number){
    return this.http.get<ServiceResponse<Media>>(this.baseUrl + "media/" + id);
  }

  eidMedia(media: Media) {
    return this.http.put<ServiceResponse<Media>>(this.baseUrl + "media/", media);
  }

  addMedia(media: AddMedia) {
    let headers = this.declareAuthHeader();
    return this.http.post<ServiceResponse<AddMedia>>(this.baseUrl + "media", media,
    {headers: headers});
  }

  declareAuthHeader() {
    let headers = new HttpHeaders();
    var jwtToken = JSON.parse(localStorage.getItem('user')).token;
    const authroizationToken = 'bearer '.concat(jwtToken);
    headers = headers.append('Authorization', authroizationToken);
    return headers;
  }
}
