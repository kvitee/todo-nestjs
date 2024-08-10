import { forwardRef, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { PrismaModule } from "../prisma/prisma.module";

import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthGuard } from "./auth.guard";


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
      useClass: AuthGuard,
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
