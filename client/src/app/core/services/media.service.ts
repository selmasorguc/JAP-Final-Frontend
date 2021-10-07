import { ServiceResponse } from '../models/serviceResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetMedia } from '../models/getMedia';
import { Media } from '../models/media';
import { Rating } from '../models/rating';
import { environment } from 'src/environments/environment';


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
}
