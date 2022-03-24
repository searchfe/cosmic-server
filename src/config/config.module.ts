import { Module, Global } from '@nestjs/common';
import { ConfigService, config } from './config.service';


@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: config,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {
  constructor() {}
}
