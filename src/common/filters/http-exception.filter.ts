import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 에러 응답 형식 통일
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exceptionResponse['message'] || exception.message,
      error: exceptionResponse['error'] || 'Error',
      details: exceptionResponse['details'] || {}
    };

    response.status(status).json(errorResponse);
  }
} 