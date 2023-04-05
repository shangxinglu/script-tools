import { Controller, Get } from '@nestjs/common';
import { parseLngLat } from 'src/utils/map/openStreetMap';

@Controller('map')
export class MapController {
  @Get('test')
  test() {
    return 'test';
  }
}
