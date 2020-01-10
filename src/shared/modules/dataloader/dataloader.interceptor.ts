import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { DataloaderService } from './dataloader.service';
import { ICustomContext } from '@shared/config/modules/graphql/model/context.interface';

export const DATALOADER_CONTEXT_KEY: string = 'DATALOADER_CONTEXT_KEY';

@Injectable()
export class DataloaderInterceptor implements NestInterceptor {
  constructor(private readonly dataloaderService: DataloaderService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const graphqlExecutionContext: GraphQLExecutionContext = GqlExecutionContext.create(context);

    const ctx = graphqlExecutionContext.getContext<ICustomContext>();

    if (ctx[DATALOADER_CONTEXT_KEY] === undefined) {
      ctx[DATALOADER_CONTEXT_KEY] = () => {
        if (ctx.dataloader === undefined) {
          ctx.dataloader = this.dataloaderService.getDataloader();
        }
        return ctx.dataloader;
      };
    }
    return next.handle();
  }
}
