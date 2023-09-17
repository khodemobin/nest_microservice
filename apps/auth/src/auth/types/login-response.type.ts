import { UserResponseType } from './user-response.type';

export interface LoginResponseType {
  user: UserResponseType;
  token: string;
}
