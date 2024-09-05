import { Module } from "@nestjs/common";

import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

import { PrismaModule } from "../prisma/prisma.module";


@Module({
  controllers: [
    RolesController,
  ],
  providers: [
    RolesService,
  ],
  imports: [
    PrismaModule,
  ],
})
export class RolesModule {}
