import { Address } from './address';
import { Media } from './media';
import { User } from "./user";

export interface Screening {
    id: number;
    startTime: Date;
    maxSeatsNumber: number;
    media: Media;
    mediaId: number;
    user: User;
    address: Address;
    price: number;
  }
