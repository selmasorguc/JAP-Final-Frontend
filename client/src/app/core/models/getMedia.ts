import { MediaType } from "./mediaType";

export class GetMedia {
    page: number | undefined;
    itemsPerPage: number | undefined;
    mediaType: MediaType | undefined;
    searchQuery: string | undefined;
  }