import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AuthEntity } from "./entities/auth.entity";
import { LoginDto } from "./dto/login.dto";
import { jwtConstants } from "./constants";

import { UsersService } from "../users/users.service";
import { UserEntity } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const createdUser = await this.usersService.create({
      ...dto,
      password: passwordHash,
    });

    return await this.generateToken(createdUser);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const passwordMatch = await bcrypt.compare(
      dto?.password,
      user?.password ?? ""
    );

    if (!user || !passwordMatch) {
      throw new UnauthorizedException({
        message: "Incorrect email or password.",
      });
    }

    return await this.generateToken(user);
  }

  private async generateToken(user: UserEntity): Promise<AuthEntity> {
    const payload = {
      sub: user.id,
      username: user.email,
      roles: user.roles,
    };

    return {
      accessToken: await this.jwtService.signAsync(
        payload,
        {
          secret: jwtConstants.secret,
        }
      ),
    };
  }
}
