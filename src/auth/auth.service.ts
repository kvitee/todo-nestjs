import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";

import { AuthEntity } from "./entities/auth.entity";
import { LoginDto } from "./dto/login.dto";

import { UserEntity } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create.user.dto";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(dto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(dto.email);

    if (candidate) {
      throw new BadRequestException({
        message: "User with such email already exists."
      });
    }

    const createdUser = await this.usersService.create(dto);

    return this.generateToken(createdUser);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || user.password !== dto?.password) {
      throw new UnauthorizedException({
        message: "Incorrect email or password."
      });
    }

    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity): Promise<AuthEntity> {
    const payload = {
      sub: user.id,
      username: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
