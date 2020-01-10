import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { ConfigService } from '@shared/config/config.service';
import { ICustomContext } from '@shared/config/modules/graphql/model/context.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (this.configService.isApiAuthEnabled) {
      const graphqlExecutionContext: GraphQLExecutionContext = GqlExecutionContext.create(context);
      const ctx = graphqlExecutionContext.getContext<ICustomContext>();
      const authorization = ctx.req.headers.authorization;

      if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split('Bearer ')[1];
        ctx.user = this.authService.validateToken(token);
      }
    }
    return true;
  }
}
