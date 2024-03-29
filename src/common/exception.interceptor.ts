import type {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((value) => {
                console.log('V', value);
                return value;
            }),
            catchError((e) => {
                console.log(e);
                return e;
            }),
        );
    }
}
