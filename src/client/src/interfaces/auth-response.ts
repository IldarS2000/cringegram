import {UserInfoResponse} from './user-info-response';

export interface AuthResponse extends Omit<UserInfoResponse, 'avatar'>{
    token: string;
}