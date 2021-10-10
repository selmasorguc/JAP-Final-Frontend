import { Address } from './address';
import { Media } from './media';
import { User } from "./user";

export class Screening {
    id: number;
    startTime: Date;
    maxSeatsNumber: number;
    media: Media;
    mediaId: number;
    user: User;
    userId: number;
    address: Address;
    addressId: number;
    price: number;
  }
