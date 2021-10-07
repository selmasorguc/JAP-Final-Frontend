import { Actor } from "./actor";
import { MediaType } from "./mediaType";
import { Rating } from "./rating";

export interface Media {
    id: number;
    title: string;
    coverUrl: string;
    releaseDate: Date;
    description: string;
    ratings: Rating[];
    cast: Actor[];
    mediaType: MediaType;
  }


  