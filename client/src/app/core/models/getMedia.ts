import { MediaType } from "./mediaType";

export interface GetMedia {
    page: number | undefined;
    itemsPerPage: number | undefined;
    mediaType: MediaType | undefined;
    searchQuery: string | undefined;
  }