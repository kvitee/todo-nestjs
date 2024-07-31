import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";


export class UserEntity implements User {
  @ApiProperty({
    example: "1",
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
}
