import { OmitType } from "@nestjs/swagger";

import { UserEntity } from "../entities/user.entity";


export class PublicUserDto extends OmitType(UserEntity, ["password"]) {}
