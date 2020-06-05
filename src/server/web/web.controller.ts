import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from 'src/config.service';

@Controller()
export class WebController {
  constructor(private config:ConfigService) {}
    @Get(['/', '/index'])
    @Render('index')
    index() {
      return { base: '/' };
    }

    // @Get('login')
    // @Render(config.PAGE_LANDING)
    // login() {
    //   return { title: 'P' };
    // }
}
