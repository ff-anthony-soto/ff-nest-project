import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { IUser } from '../model/user.interface';
import { ConfigService } from '@shared/config/config.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly configService: ConfigService) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.configService.isApiAuthEnabled) {
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const [_, __, { user }] = context.getArgs();

    return user && user.roles && this.hasRole(user, roles);
  }

  private hasRole(user: IUser, roles: string[]) {
    return user.roles.some(role => roles.includes(role));
  }
}
