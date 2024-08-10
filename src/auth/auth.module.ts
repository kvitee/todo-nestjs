import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { PrismaModule } from "../prisma/prisma.module";

import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";


const jwtSecret = process.env.JWT_SECRET || "secret";

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    UsersService,
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
    UsersModule,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
