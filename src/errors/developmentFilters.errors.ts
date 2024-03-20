import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilterDevelopment implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const expMessage: string | undefined = exception.message;
    const httpStatus =
      exception instanceof HttpException
        ? {
            errorType: 'HttpException',
            statusCode: exception.getStatus(),
            response: exception.getResponse()['message'],
          }
        : {
            errorType: 'Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            response: expMessage || 'Something went wrong',
          };

    response.status(httpStatus.statusCode).json({
      statusCode: httpStatus.statusCode,
      type: exception.name,
      message: httpStatus.response,
      devError: exception.stack?.split('\n').slice(0, 2),
    });
  }
}
