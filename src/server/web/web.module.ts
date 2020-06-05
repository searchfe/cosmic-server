import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { ConfigModule } from '../../config.module';

@Module({
  imports: [ConfigModule],
  controllers: [WebController]
})
export class WebModule {}
