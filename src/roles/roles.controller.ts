import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { RolesService } from "./roles.service";
import { GiveRoleDto } from "./dto/give-role.dto";
import { TakeRoleDto } from "./dto/take-role.dto";

import { RequireRoles } from "../auth/require-roles.decorator";


@ApiTags("Roles")
@Controller("/roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({
    summary: "Give a role to user",
  })
  @ApiNoContentResponse({
    description: "User role added successfully.",
  })
  @ApiConflictResponse({
    description: "User already has such role.",
  })
  @RequireRoles("ADMIN")
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  giveRole(@Body() giveRoleDto: GiveRoleDto) {
    return this.rolesService.giveRole(giveRoleDto);
  }

  @ApiOperation({
    summary: "Take away a role from user",
  })
  @ApiNoContentResponse({
    description: "User role taken away successfully.",
  })
  @ApiNotFoundResponse({
    description: "User does not have such role.",
  })
  @RequireRoles("ADMIN")
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  takeRole(@Body() takeRoleDto: TakeRoleDto) {
    return this.rolesService.takeRole(takeRoleDto);
  }
}
