import { APP_GUARD } from "@nestjs/core";
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./roles.guard";
import { jwtConstants } from "./constants";

import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";


@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "1h",
      },
    }),
    PrismaModule,
    forwardRef(() => UsersModule),
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
