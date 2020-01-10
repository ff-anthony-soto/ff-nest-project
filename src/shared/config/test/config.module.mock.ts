import { Test } from '@nestjs/testing';

import { ConfigService } from '@config/config.service';

export default Test.createTestingModule({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService('.env.development'),
    },
  ],
});
