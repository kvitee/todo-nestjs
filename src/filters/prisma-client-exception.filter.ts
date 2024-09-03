import { Response } from "express";
import { BaseExceptionFilter } from "@nestjs/core";
import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";


@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let message = exception.message;

    console.error(exception);

    switch (exception.code) {
      case "P2002":
        response.status(HttpStatus.CONFLICT);

        if (exception.meta?.modelName === "User") {
          message = "Email already taken.";
        }

        response.json({
          message: message,
        });

        break;

      case "P2025":
        response
          .status(HttpStatus.NOT_FOUND)
          .json({
            message: `${exception.meta?.modelName} does not exist.`,
          });

        break;

      default:
        super.catch(exception, host);
        break;
    }
  }
}
