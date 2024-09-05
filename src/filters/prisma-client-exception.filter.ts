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

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    const modelName = exception.meta?.modelName;

    switch (exception.code) {
      case "P2002":
        statusCode = HttpStatus.CONFLICT;

        message = {
          User: "Email already taken.",
          UserRole: "User already has this role.",
        }[
          `${modelName}`
        ] ?? message;

        break;

      case "P2003":
        statusCode = HttpStatus.NOT_FOUND;

        if (modelName === "UserRole") {
          message = "User does not exist";
        }

        break;

      case "P2025":
        statusCode = HttpStatus.NOT_FOUND;
        message = `${modelName} does not exist.`;

        break;

      default:
        super.catch(exception, host);
        return;
    }

    response
      .status(statusCode)
      .json({
        statusCode,
        message,
      });
  }
}
