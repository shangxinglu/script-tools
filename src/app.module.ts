import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TestModule } from './app/test/test.module';
import { MapController } from './app/map/map.controller';

@Module({
  imports: [TestModule],
  controllers: [AppController, MapController],
  providers: [AppService],
})
export class AppModule {}
