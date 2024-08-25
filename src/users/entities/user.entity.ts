import { ApiProperty } from "@nestjs/swagger";
import { User, UserRole } from "@prisma/client";


export class UserEntity implements User {
  @ApiProperty({
    example: "41",
    description: "ID of user"
  })
  readonly id: number;

  @ApiProperty({
    example: "user@example.com",
    description: "Email address"
  })
  readonly email: string;

  @ApiProperty({
    example: "p@sSw0rd",
    description: "Password"
  })
  readonly password: string;

  @ApiProperty({
    example: "John",
    description: "Name of user"
  })
  readonly name: string;

  @ApiProperty({
    example: [
      {
        userId: 41,
        role: "USER",
      },
    ],
    description: "Array of user roles"
  })
  readonly roles: UserRole[];
}
