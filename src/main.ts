import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from './config.service';
import { HttpExceptionFilter } from './server/common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useGlobalInterceptors(new ExceptionInterceptor());
  // app.useGlobalFilters(new ErrorFilter());
  app.enableCors({
    methods: 'GET',
    maxAge: 3600,
  });
  const config = app.get(ConfigService);
  app.useStaticAssets(config.LOCAL_STATIC_ROOT, {
    prefix: config.STATIC_PREFIX,
  });
  app.useStaticAssets(`${config.LOCAL_WEB_ROOT}/`, {prefix: '/', dotfiles: "deny",index: false,});
  // app.useStaticAssets(`${config.LOCAL_WEB_ROOT}/admin/`, {prefix: '/admin/', dotfiles: "deny",index: false,});

  app.setBaseViewsDir([config.LOCAL_WEB_ROOT]);
  app.setViewEngine('hbs');

  app.useGlobalFilters(new HttpExceptionFilter);

  await app.listen(config.PORT || 3000);
}
bootstrap();
