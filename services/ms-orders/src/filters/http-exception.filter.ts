/* istanbul ignore file */
import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        return exception.getResponse();
    }
}
