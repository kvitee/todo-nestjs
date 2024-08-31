import { APP_GUARD } from "@nestjs/core";
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";


export const jwtSecret = process.env.JWT_SECRET || "secret";

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
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
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
