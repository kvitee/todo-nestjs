import { ApiProperty } from "@nestjs/swagger";


export class AuthEntity {
  @ApiProperty({
    example: "eyJhbGcF.eyJzdWiOjEsInVzZ.vbhFOvEGnD",
    description: "Token to access protected features.",
  })
  readonly accessToken: string;
}
