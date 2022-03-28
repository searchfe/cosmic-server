import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import { config } from '@/config/config.service';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            date: new Date().toLocaleDateString(),
            path: request.url,
        });
    }
}
