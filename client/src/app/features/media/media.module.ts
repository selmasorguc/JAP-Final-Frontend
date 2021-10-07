import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SharedModule } from 'src/app/shared/shared.module';
import { MediaCardComponent } from '../media/media-card/media-card.component';
import { DisplayMediaComponent } from './display-media/display-media.component';
import { EditMediaComponent } from './edit-media/edit-media.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchListComponent } from './search-list/search-list.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';


@NgModule({
    declarations: [
        MediaCardComponent,
        TvShowsComponent,
        MoviesComponent,
        SearchListComponent,
        DisplayMediaComponent,
        EditMediaComponent
    ],
    imports: [
        SharedModule,
        RatingModule,
        RouterModule,
    ],
    exports: [
        MediaCardComponent, 
        TvShowsComponent,
        MoviesComponent,
        SearchListComponent,
        DisplayMediaComponent,
        EditMediaComponent
    ]
})
export class MediaModule { }
