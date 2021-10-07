import { Ticket } from "./ticket";

export interface User {
    username: string;
    token: string;
    roles: string[];
  }