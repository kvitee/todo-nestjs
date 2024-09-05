import { ApiProperty } from "@nestjs/swagger";
import { $Enums, UserRole } from "@prisma/client";
import { IsEnum, IsInt } from "class-validator";


export class UserRoleEntity implements UserRole {
  @ApiProperty({
    example: "41",
    description: "ID of user",
  })
  @IsInt({
    message: "User ID must be a number.",
  })
  readonly userId: number;

  @ApiProperty({
    example: "USER",
    description: "Role of user",
  })
  @IsEnum(
    $Enums.Role,
    {
      message: "Value of role field must be one of the existing roles.",
    },
  )
  readonly role: $Enums.Role;
}
