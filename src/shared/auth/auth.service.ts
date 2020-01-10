import { Injectable } from '@nestjs/common';

import { IUser } from './model/user.interface';

@Injectable()
export class AuthService {
  public validateToken(token: string): IUser {
    return { username: 'Anthony', roles: ['admin'] };
  }
}
