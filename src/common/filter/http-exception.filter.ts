import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { config } from '@/config/config.service';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus()
    switch(status) {
      case 404:
        response.render(config.PAGE_404);
          // response.s(config.PAGE_404);
          return;
        break;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        date: new Date().toLocaleDateString(),
        path: request.url,
      });
  }

}
