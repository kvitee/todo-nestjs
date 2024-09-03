import { APP_FILTER } from "@nestjs/core";
import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

import { PrismaClientExceptionFilter }
  from "../filters/prisma-client-exception.filter";


@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
  exports: [
    PrismaService,
  ],
})
export class PrismaModule {}
