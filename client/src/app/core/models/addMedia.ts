import { Actor } from "./actor";
import { MediaType } from "./mediaType";

export class AddMedia {
    title: string;
    coverUrl: string;
    releaseDate: string;
    description: string;
    mediaType: MediaType;
    cast: Actor[];
}

