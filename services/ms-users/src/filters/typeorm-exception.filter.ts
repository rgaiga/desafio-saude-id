/* istanbul ignore file */
import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        if (exception.name === 'QueryFailedError')
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: exception.message,
                error: 'Bad Request',
            };

        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `${exception.name}: ${exception.message}`,
            error: 'Internal Server Error',
        };
    }
}
