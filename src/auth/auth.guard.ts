import { Request } from "express";
import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

import { jwtSecret } from "./auth.module";
import { IS_PUBLIC_KEY } from "./public.decorator";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException({
        message: "User is not authorized.",
      });
    }

    try {
      const payload = this.jwtService.verify(
        token, { secret: jwtSecret }
      );

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException({
        message: "Token is invalid or expired.",
      });
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    const [ type, token ] = authHeader?.split(" ") ?? [];

    return (type === "Bearer") ? token : undefined;
  }
}
