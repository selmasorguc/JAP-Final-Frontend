import { Media } from "./media";
import { Screening } from "./screening";
import { User } from "./user";

export interface Ticket {
    screeningId: number;
    screening: Screening;
    mediaId:number;
    media: Media;
    userId: number;
    user: User;
    dateOfPurchase: Date;
  }
