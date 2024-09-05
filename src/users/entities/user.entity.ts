import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";

import { UserRoleEntity } from "../../roles/entities/user-role.entity";


export class UserEntity implements User {
  @ApiProperty({
    example: 41,
    description: "ID of user",
  })
  @IsInt()
  readonly id: number;

  @ApiProperty({
    example: "user@example.com",
    description: "Email address",
  })
  @IsString({
    message: "Email must be a string.",
  })
  @IsNotEmpty({
    message: "Email must not be empty.",
  })
  @IsEmail({}, {
    message: "Must be a valid email string.",
  })
  readonly email: string;

  @ApiProperty({
    example: "p@sSw0rd",
    description: "Password",
  })
  @IsString({
    message: "Must be a string.",
  })
  @IsNotEmpty({
    message: "Password must not be empty.",
  })
  @Length(8, 24, {
    message: "Password length must be between 8 and 24 symbols.",
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 2,
      minUppercase: 1,
    },
    {
      message: "Password is not strong enough.",
    }
  )
  readonly password: string;

  @ApiProperty({
    example: "John",
    description: "Name of user",
  })
  @IsString({
    message: "Name must be a string.",
  })
  @IsNotEmpty({
    message: "Name must not be empty.",
  })
  @Length(2, 20, {
    message: "Name length must be between 2 and 20 characters.",
  })
  readonly name: string;

  @ApiProperty({
    description: "Array of user roles",
    required: false,
    isArray: true,
    type: UserRoleEntity,
  })
  readonly roles?: UserRoleEntity[];
}
