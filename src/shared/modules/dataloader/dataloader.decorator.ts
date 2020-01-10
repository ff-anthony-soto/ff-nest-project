import { createParamDecorator, InternalServerErrorException } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DataloaderInterceptor, DATALOADER_CONTEXT_KEY } from './dataloader.interceptor';

export const Dataloader: () => ParameterDecorator = createParamDecorator((_, [__, ___, context, ____]: any) => {
  if (context[DATALOADER_CONTEXT_KEY] === undefined) {
    throw new InternalServerErrorException(
      `You should provide interceptor ${DataloaderInterceptor.name} globaly with ${APP_INTERCEPTOR}`,
    );
  }
  return context[DATALOADER_CONTEXT_KEY]();
});
