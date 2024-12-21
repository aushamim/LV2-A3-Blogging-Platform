// User core interface
export interface UserInterface {
  name       : string;
  email      : string;
  password   : string;
  role?      : "admin" | "user";
  isBlocked? : boolean;
} // prettier-ignore

export interface UserGetInterface {
  _id?   : string,
  email? : string;
} // prettier-ignore

export interface UserLoginInterface {
  email    : string;
  password : string;
} // prettier-ignore
