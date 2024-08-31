import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { AuthEntity } from "./entities/auth.entity";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./public.decorator";

import { CreateUserDto } from "../users/dto/create.user.dto";


@ApiTags("Authorization")
@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Sign up",
  })
  @ApiCreatedResponse({
    type: AuthEntity,
    description: "User has signed up successfully.",
  })
  @ApiBadRequestResponse({
    description: "User with such email already exist.",
  })
  @Public()
  @Post("/signup")
  signup(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({
    summary: "Login",
  })
  @ApiOkResponse({
    type: AuthEntity,
    description: "User has logged in successfully.",
  })
  @ApiUnauthorizedResponse({
    description: "Incorrect email or password.",
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
