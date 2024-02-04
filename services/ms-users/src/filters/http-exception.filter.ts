/* istanbul ignore file */
import { Catch, HttpException, ExceptionFilter } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException) {
        return exception.getResponse();
    }
}
