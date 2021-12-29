import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpCode } from "@nestjs/common";
import { Response } from 'express';
import { GlobalResponse } from "./response";

@Catch()
export class AppException implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();		
        const catchException: HttpStatus[] = [
            HttpStatus.SERVICE_UNAVAILABLE,
            HttpStatus.NOT_ACCEPTABLE,
            HttpStatus.EXPECTATION_FAILED,
            HttpStatus.BAD_REQUEST,
            HttpStatus.SERVICE_UNAVAILABLE,
            HttpStatus.NOT_FOUND,
            HttpStatus.UNAUTHORIZED
        ];

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        if(catchException.includes(exception.status)) {
            statusCode = exception.status;
        }

        //Set message
        let message: string = '';
        if(exception?.response?.message) {
            message = Array.isArray(exception.response.message) ? 
                exception.response.message[0]: 
                exception.response.message;
        } else {
            message = (exception instanceof Error) ? 
                exception.message: 
                exception.message.error;
        }

        res.status(statusCode).json(new GlobalResponse<object>({
            status: exception.response.status??'Bad Request',
            message: message,
            data: {}
        }));
    }
}