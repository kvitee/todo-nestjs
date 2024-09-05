import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./roles/roles.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
})
export class AppModule {}
